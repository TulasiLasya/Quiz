const quizDatabase = {
  1: [
    {
      question:
        "Which Git command records your staged file snapshots permanently in history?",
      answers: ["git save", "git commit", "git push", "git log"],
      correct: "git commit",
    },
    {
      question:
        "What is the standard open-source license known for being extremely permissive?",
      answers: ["GNU GPL v3", "MIT License", "Affero GPL", "Creative Commons"],
      correct: "MIT License",
    },
    {
      question:
        "What platform feature is used to propose changes from your fork back upstream?",
      answers: [
        "Issue Thread",
        "Pull Request",
        "Merge Commit Hook",
        "Clone Request",
      ],
      correct: "Pull Request",
    },
    {
      question:
        "Which markdown file acts as the main landing profile page for repositories?",
      answers: ["INDEX.html", "ABOUT.txt", "README.md", "CONFIG.json"],
      correct: "README.md",
    },
    {
      question:
        "If a public repository has no explicit license, what rights do others legally have?",
      answers: [
        "Full commercial use rights",
        "No rights; standard strict copyright applies",
        "Automatic public domain status",
        "MIT reuse compliance rules",
      ],
      correct: "No rights; standard strict copyright applies",
    },
  ],
  2: [
    {
      question:
        "Which Linux terminal command instantly prints your current working directory pathway?",
      answers: ["dir", "whereami", "pwd", "path"],
      correct: "pwd",
    },
    {
      question:
        "What is a malicious program masquerading as legitimate system software called?",
      answers: ["Rootkit", "Worm Core", "Trojan Horse", "Ransom Array"],
      correct: "Trojan Horse",
    },
    {
      question:
        "What default network tool is used to monitor or filter incoming port traffic logs?",
      answers: [
        "Compiler Linker",
        "Firewall",
        "Hypervisor",
        "SSH Tunneling Node",
      ],
      correct: "Firewall",
    },
    {
      question:
        "What superuser command access prefix allows running items with root privileges?",
      answers: ["run -admin", "sudo", "elevate", "su --override"],
      correct: "sudo",
    },
    {
      question:
        "What type of attack involves overwhelming targeted servers with distributed traffic?",
      answers: [
        "Phishing Scam",
        "SQL Injection",
        "DDoS Attack",
        "Man-in-the-Middle",
      ],
      correct: "DDoS Attack",
    },
  ],
  3: [
    {
      question:
        "What classic programmer phrase is traditionally outputted by a baseline test script?",
      answers: [
        "System Online",
        "Run Build",
        "Hello World",
        "Init Core Completed",
      ],
      correct: "Hello World",
    },
    {
      question:
        "Which iconic text editor is famous for its steep learning curve and modal command design?",
      answers: ["VS Code", "Vim", "Notepad++", "Sublime Text"],
      correct: "Vim",
    },
    {
      question:
        "In programming language tracking culture, what standard item represents a structural bug?",
      answers: [
        "A typo error",
        "An unintended software defect or glitch",
        "A missing framework package",
        "A system database failure",
      ],
      correct: "An unintended software defect or glitch",
    },
    {
      question:
        "What year did Linux creator Linus Torvalds release the initial open source kernel?",
      answers: ["1985", "1991", "1998", "2004"],
      correct: "1991",
    },
    {
      question:
        "What character character symbol denotes a system comment line in languages like Python?",
      answers: ["//", "/*", "#", "<!--"],
      correct: "#",
    },
  ],
};

let currentLevel = 1;
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let canClick = true;

// Timing Control Sets
let timerInterval = null;
let secondsRemaining = 15;
const SECONDS_PER_QUESTION = 15;
const PASSING_SCORE = 4;

// Session-Scoped Trackers (Wipes clean on manual page updates)
let highestUnlockedLevel = 1;
let levelTimeTaken = 0;
let totalTimeTaken = 0;
let totalScore = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* Hard Reset Strategy Command */
function hardResetPlatform() {
  clearInterval(timerInterval);
  highestUnlockedLevel = 1;
  currentLevel = 1;
  totalTimeTaken = 0;
  totalScore = 0;
  applyThemeContext(1);
  showDashboard();
}

function applyThemeContext(levelNum) {
  const view = document.getElementById("app-viewport");
  // Clear legacy styling identifiers
  view.classList.remove("level-theme-0", "level-theme-1", "level-theme-2", "level-theme-3");
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

function showDashboard() {
  clearInterval(timerInterval);
  let themeToApply = highestUnlockedLevel - 1;
  applyThemeContext(themeToApply);
  switchScreenContext("view-dashboard", "dashboard-screen", themeToApply);
  updateDashboardUI();
}

function selectDashboardLevel(levelNum) {
  currentLevel = levelNum;
  applyThemeContext(levelNum);
  startQuizLevel();
}

function startQuizLevel() {
  shuffledQuestions = shuffleArray([...quizDatabase[currentLevel]]);
  currentQuestionIndex = 0;
  score = 0;
  levelTimeTaken = 0;
  switchScreenContext("view-arena", "quiz-screen");
  showQuestion();
}

function showQuestion() {
  canClick = true;
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  document.getElementById("current-level-text").innerText =
    `STAGE 0${currentLevel}`;
  document.getElementById("question-counter").innerText =
    `${currentQuestionIndex + 1} / 5`;

  const pct = (currentQuestionIndex / 5) * 100;
  document.getElementById("progress-bar-fill").style.width = `${pct}%`;

  document.getElementById("question-text").innerText = currentQuestion.question;
  const answerButtonsElement = document.getElementById("answer-buttons");
  answerButtonsElement.innerHTML = "";

  const shuffledAnswers = shuffleArray([...currentQuestion.answers]);
  shuffledAnswers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = `${index + 1}. ${answer}`;
    button.dataset.answer = answer;
    button.classList.add("quiz-option-btn");
    button.addEventListener("click", (e) =>
      handleAnswerSelection(e, answer, currentQuestion.correct),
    );
    answerButtonsElement.appendChild(button);
  });

  startQuestionTimer();
}

function startQuestionTimer() {
  clearInterval(timerInterval);
  secondsRemaining = SECONDS_PER_QUESTION;
  document.getElementById("timer-seconds").innerText = secondsRemaining;

  timerInterval = setInterval(() => {
    secondsRemaining--;
    document.getElementById("timer-seconds").innerText = secondsRemaining;

    if (secondsRemaining <= 0) {
      clearInterval(timerInterval);
      handleTimeOutLoss();
    }
  }, 1000);
}

function handleTimeOutLoss() {
  canClick = false;
  levelTimeTaken += SECONDS_PER_QUESTION;
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const allButtons = document.querySelectorAll(".quiz-option-btn");

  allButtons.forEach((btn) => {
    if (btn.dataset.answer === currentQuestion.correct)
      btn.classList.add("correct-flash");
  });

  advanceToNextStep();
}

function handleAnswerSelection(e, selected, correct) {
  if (!canClick) return;
  canClick = false;
  clearInterval(timerInterval);
  
  levelTimeTaken += (SECONDS_PER_QUESTION - Math.max(0, secondsRemaining));

  const clickedButton = e.target;
  const allButtons = document.querySelectorAll(".quiz-option-btn");

  if (selected === correct) {
    score++;
    clickedButton.classList.add("correct-flash");
  } else {
    clickedButton.classList.add("wrong-flash");
    allButtons.forEach((btn) => {
      if (btn.dataset.answer === correct) btn.classList.add("correct-flash");
    });
  }

  advanceToNextStep();
}

function updateProgressBarFinal() {
  document.getElementById("progress-bar-fill").style.width = `100%`;
}

function advanceToNextStep() {
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < 5) {
      showQuestion();
    } else {
      evalAndShowResults();
    }
  }, 1200);
}

function evalAndShowResults() {
  clearInterval(timerInterval);
  updateProgressBarFinal();
  
  if (score >= PASSING_SCORE) {
    totalTimeTaken += levelTimeTaken;
    totalScore += score;
    
    if (currentLevel === 3) {
      showFinaleScreen();
      return;
    }
  }

  switchScreenContext("view-arena", "result-screen");

  const scoreText = document.getElementById("final-score");
  const resTitle = document.getElementById("result-title");
  const resMsg = document.getElementById("result-msg");
  const actionBtn = document.getElementById("action-btn");

  scoreText.innerText = score;

  if (score >= PASSING_SCORE) {
    resTitle.innerText = "CONGRATULATIONS!";
    resTitle.style.color = "var(--neon-emerald)";

    if (currentLevel === highestUnlockedLevel) {
      highestUnlockedLevel++;
    }

    resMsg.classList.add("bright");
    resMsg.innerText = `You successfully passed Stage 0${currentLevel}! Stage 0${currentLevel + 1} is now unlocked.`;
    document.getElementById("level-highlight-time").innerText = `${levelTimeTaken}s`;
    document.getElementById("highlight-time-container").classList.remove("hide");
    
    actionBtn.innerText = "Return to Home Page";
    actionBtn.onclick = () => {
      showDashboard();
    };
  } else {
    resTitle.innerText = "MATCH LOST";
    resTitle.style.color = "var(--neon-rose)";
    resMsg.classList.remove("bright");
    resMsg.innerText = `Speed metric or comprehension limits hit. Secure at least ${PASSING_SCORE}/5 hits to pass verification checkpoints.`;
    document.getElementById("highlight-time-container").classList.add("hide");
    actionBtn.innerText = "Return to Home Page";
    actionBtn.onclick = () => {
      showDashboard();
    };
  }
}

function showFinaleScreen() {
  switchScreenContext("view-arena", "finale-screen");
  
  document.getElementById("finale-time").innerText = `${totalTimeTaken}s / 225s`;
  document.getElementById("finale-total-score").innerText = `${totalScore} / 15`;
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

// System Init Core Routine (No local storage means it resets on every browser window reload)
window.onload = () => {
  hardResetPlatform();
};

// Global keyboard event listener for option selection
document.addEventListener("keydown", (e) => {
  if (!canClick) return;
  // Check if we are on the quiz screen
  const view = document.getElementById("app-viewport");
  if (!view.classList.contains("view-arena") || document.getElementById("quiz-screen").classList.contains("hide")) {
    return;
  }
  
  const keyMap = { "1": 0, "2": 1, "3": 2, "4": 3 };
  if (keyMap[e.key] !== undefined) {
    const allButtons = document.querySelectorAll(".quiz-option-btn");
    const targetButton = allButtons[keyMap[e.key]];
    if (targetButton) {
      targetButton.click();
    }
  }
});
