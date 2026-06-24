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

/* Hard Reset Strategy Command */
function hardResetPlatform() {
  clearInterval(timerInterval);
  highestUnlockedLevel = 1;
  currentLevel = 1;
  totalTimeTaken = 0;
  totalScore = 0;
  failedLevels = []; // Clear failures on hard reset
  applyThemeContext(1);
  showDashboard();
}

function showDashboard() {
  clearInterval(timerInterval);
  let themeToApply = highestUnlockedLevel - 1;
  if (themeToApply < 1) themeToApply = 1; // Safeguard bounds
  applyThemeContext(themeToApply);
  switchScreenContext("view-dashboard", "dashboard-screen", themeToApply);

  // Handle the Legend celebration banner if all 3 levels are finished without a failure
  const appreciationMsg = document.getElementById("appreciation-msg");
  if (highestUnlockedLevel > 3 && failedLevels.length === 0) {
    appreciationMsg.innerText =
      '🎉 git commit -m "CHALLENGE CONQUERED" ';
    appreciationMsg.classList.remove("hide");
  } else {
    appreciationMsg.classList.add("hide");
  }

  updateDashboardUI();
}

function selectDashboardLevel(levelNum) {
  // Prevent any actions if this level was previously failed
  if (failedLevels.includes(levelNum)) return;

  currentLevel = levelNum;
  applyThemeContext(levelNum);
  showLevelIntro(levelNum);
}

// System Init Core Routine — startup is managed by js/boot.js
// window.onload is defined there and calls hardResetPlatform() after the boot sequence

// Global keyboard event listener for option selection
document.addEventListener("keydown", (e) => {
  if (!canClick) return;
  // Check if we are on the quiz screen
  const view = document.getElementById("app-viewport");
  if (
    !view.classList.contains("view-arena") ||
    document.getElementById("quiz-screen").classList.contains("hide")
  ) {
    return;
  }

  const keyMap = { 1: 0, 2: 1, 3: 2, 4: 3 };
  if (keyMap[e.key] !== undefined) {
    const allButtons = document.querySelectorAll(".quiz-option-btn");
    const targetButton = allButtons[keyMap[e.key]];
    if (targetButton) {
      targetButton.click();
    }
  }
});

function selectDashboardLevel(levelNum) {
  currentLevel = levelNum;
  applyThemeContext(levelNum);
  showLevelIntro(levelNum);
}

// System Init Core Routine — startup is managed by js/boot.js
// window.onload is defined there and calls hardResetPlatform() after the boot sequence

// Global keyboard event listener for option selection
document.addEventListener("keydown", (e) => {
  if (!canClick) return;
  // Check if we are on the quiz screen
  const view = document.getElementById("app-viewport");
  if (
    !view.classList.contains("view-arena") ||
    document.getElementById("quiz-screen").classList.contains("hide")
  ) {
    return;
  }

  const keyMap = { 1: 0, 2: 1, 3: 2, 4: 3 };
  if (keyMap[e.key] !== undefined) {
    const allButtons = document.querySelectorAll(".quiz-option-btn");
    const targetButton = allButtons[keyMap[e.key]];
    if (targetButton) {
      targetButton.click();
    }
  }
});
