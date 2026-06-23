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
