/* ================================================
   BOOT SEQUENCE — js/boot.js
   Terminal: git clone + rotating cursor prompt
   Transition: fade-to-black overlay
   ================================================ */

let rotatingInterval = null;
let challengeStarting = false;

const gitBootLines = [
  { text: "$ git clone open-source-challenge", type: "cmd" },
  { text: "", type: "blank" },
  { text: "Cloning into 'open-source-challenge'...", type: "out" },
  { text: "remote: Enumerating objects: 45, done.", type: "dim" },
  { text: "remote: Counting objects: 100% (45/45), done.", type: "dim" },
  { text: "Receiving objects: 100% ████████████████ 45/45", type: "bar" },
  { text: "Resolving deltas: 100% (18/18), done.", type: "dim" },
  { text: "", type: "blank" },
  { text: "$ cd open-source-challenge && ls", type: "cmd" },
  { text: "", type: "blank" },
  { text: "  questions/   stages/   hall-of-fame/   README.md", type: "ls" },
  { text: "", type: "blank" },
  { text: "$ cat README.md", type: "cmd" },
  { text: "", type: "blank" },
  { text: "  ╔════════════════════════════════╗", type: "box" },
  { text: "  ║   OPEN SOURCE CHALLENGE        ║", type: "box-title" },
  { text: "  ╠════════════════════════════════╣", type: "box" },
  { text: "  ║  > 15 Questions                ║", type: "box-line" },
  { text: "  ║  > 3 Stages                    ║", type: "box-line" },
  { text: "  ║  > Hall of Fame                ║", type: "box-line" },
  { text: "  ╚════════════════════════════════╝", type: "box" },
];

const rotatingPrompts = [
  "learn_open_source",
  "test_your_knowledge",
  "conquer_all_stages",
  "enter_hall_of_fame",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeText(el, text, delay = 36) {
  for (const ch of text) {
    el.textContent += ch;
    await sleep(delay);
  }
}

async function startBootSequence() {
  challengeStarting = false;
  clearInterval(rotatingInterval);

  const body = document.getElementById("app-viewport");
  body.className = "view-boot level-theme-0";

  document
    .querySelectorAll(".screen-wrapper")
    .forEach((s) => s.classList.add("hide"));
  document.getElementById("boot-screen").classList.remove("hide");

  const logEl = document.getElementById("ascii-git-log");
  const readyEl = document.getElementById("ascii-ready-text");
  const startArea = document.getElementById("boot-start-area");
  const execMsg = document.getElementById("executing-msg");
  const promptCmd = document.getElementById("boot-prompt-cmd");

  logEl.innerHTML = "";
  readyEl.textContent = "";
  promptCmd.textContent = "run_challenge";
  startArea.classList.add("hide");
  execMsg.classList.add("hide");

  /* ── Phase 1: git log lines ─────────────── */
  await sleep(350);
  for (const { text, type } of gitBootLines) {
    const row = document.createElement("div");
    row.className = "ascii-log-line";

    switch (type) {
      case "cmd":
        row.classList.add("log-cmd");
        break;
      case "bar":
        row.classList.add("log-bar");
        break;
      case "dim":
        row.classList.add("log-dim");
        break;
      case "ls":
        row.classList.add("log-ls");
        break;
      case "box":
        row.classList.add("log-box");
        break;
      case "box-title":
        row.classList.add("log-box-title");
        break;
      case "box-line":
        row.classList.add("log-box-line");
        break;
      case "blank":
        row.innerHTML = "&nbsp;";
        break;
    }

    logEl.appendChild(row);

    if (type === "cmd") {
      await typeText(row, text, 36);
      await sleep(160);
    } else if (type === "blank") {
      await sleep(55);
    } else {
      row.textContent = text;
      await sleep(type === "dim" ? 60 : 95);
    }

    logEl.parentElement.scrollTop = logEl.parentElement.scrollHeight;
  }

  await sleep(500);

  /* ── Phase 2: cursor prompt appears ─────── */
  await typeText(readyEl, "$ ", 50);

  /* ── Phase 3: rotating cmd in prompt text ─ */
  startArea.classList.remove("hide");

  startArea.title = "Press ENTER to launch";

  let rIdx = 0;

  rotatingInterval = setInterval(() => {
    promptCmd.classList.add("cmd-fade-out");

    setTimeout(() => {
      promptCmd.textContent = rotatingPrompts[rIdx];

      rIdx++;

      if (rIdx >= rotatingPrompts.length) {
        clearInterval(rotatingInterval);

        setTimeout(() => {
          promptCmd.textContent = "run_challenge";
        }, 300);

        return;
      }

      promptCmd.classList.remove("cmd-fade-out");
    }, 250);
  }, 1800);
}

function executeStartChallenge() {
  if (challengeStarting) return;
  challengeStarting = true;
  clearInterval(rotatingInterval);

  const startArea = document.getElementById("boot-start-area");
  const execMsg = document.getElementById("executing-msg");
  const readyEl = document.getElementById("ascii-ready-text");
  const promptCmd = document.getElementById("boot-prompt-cmd");
  const transition = document.getElementById("screen-transition");

  /* Show executing feedback inside the terminal */
  promptCmd.textContent = "run_challenge";
  promptCmd.classList.remove("cmd-fade-out");

  const execLines = [
    "Initializing quiz engine...  [OK]",
    "Loading question bank...     [OK]",
    "Preparing stages...          [OK]",
    "Launching challenge...       [GO]",
  ];

  execMsg.classList.remove("hide");
  let eIdx = 0;
  const execInterval = setInterval(() => {
    execMsg.textContent = execLines[eIdx];
    eIdx++;
    if (eIdx >= execLines.length) {
      clearInterval(execInterval);
      /* ── fade-to-black transition ── */
      setTimeout(() => {
        transition.classList.add("t-active");
        setTimeout(() => {
          hardResetPlatform();
          setTimeout(() => transition.classList.remove("t-active"), 600);
        }, 550);
      }, 300);
    }
  }, 280);
}

/* Hook into window.onload */
window.onload = () => startBootSequence();

/* Clicking the boot prompt area triggers the start */

document.addEventListener("DOMContentLoaded", () => {
  const startArea = document.getElementById("boot-start-area");

  if (startArea) {
    startArea.addEventListener("click", () => {
      if (!document.getElementById("boot-screen").classList.contains("hide")) {
        executeStartChallenge();
      }
    });

    document.addEventListener("keydown", (e) => {
      const bootVisible = !document
        .getElementById("boot-screen")
        .classList.contains("hide");

      const startVisible = !startArea.classList.contains("hide");

      if (bootVisible && startVisible && e.key === "Enter") {
        executeStartChallenge();
      }
    });
  }
});
