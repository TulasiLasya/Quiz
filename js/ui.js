function applyThemeContext(levelNum) {
  const view = document.getElementById("app-viewport");
  view.classList.remove(
    "level-theme-0",
    "level-theme-1",
    "level-theme-2",
    "level-theme-3",
  );
  view.classList.add(`level-theme-${levelNum}`);
}

function updateDashboardUI() {
  for (let l = 1; l <= 3; l++) {
    const card = document.getElementById(`lvl-card-${l}`);
    const indicator = card.querySelector(".status-indicator");

    if (l < highestUnlockedLevel) {
      card.classList.add("locked");
      card.classList.remove("unlocked");
      card.onclick = null;
      indicator.innerText = "COMPLETED 🔒";
    } else if (l === highestUnlockedLevel) {
      card.classList.remove("locked");
      card.classList.add("unlocked");
      card.onclick = () => selectDashboardLevel(l);
      indicator.innerText = "READY TO RUN";
    } else {
      card.classList.add("locked");
      card.classList.remove("unlocked");
      card.onclick = null;
      indicator.innerText = "LOCKED 🔒";
    }
  }

  const appreciationMsg = document.getElementById("appreciation-msg");
  if (appreciationMsg) {
    if (highestUnlockedLevel > 3) {
      appreciationMsg.classList.remove("hide");
    } else {
      appreciationMsg.classList.add("hide");
    }
  }
}

function switchScreenContext(viewportClass, screenId, overrideTheme = null) {
  const view = document.getElementById("app-viewport");
  view.className = viewportClass;
  // Layer standard theme identification styles
  const themeNum = overrideTheme !== null ? overrideTheme : currentLevel;
  view.classList.add(`level-theme-${themeNum}`);

  document
    .querySelectorAll(".screen-wrapper")
    .forEach((scr) => scr.classList.add("hide"));
  const targeted = document.getElementById(screenId);
  targeted.classList.remove("hide");
}

function updateProgressBarFinal() {
  document.getElementById("progress-bar-fill").style.width = `100%`;
}
