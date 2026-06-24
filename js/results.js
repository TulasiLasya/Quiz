function evalAndShowResults() {
  clearInterval(timerInterval);
  document.getElementById("progress-bar-fill").style.width = `100%`;
  switchScreenContext("view-arena", "result-screen");

  const scoreText = document.getElementById("final-score");
  const resTitle = document.getElementById("result-title");
  const resMsg = document.getElementById("result-msg");
  const actionBtn = document.getElementById("action-btn");

  scoreText.innerText = score;

  // Level Win Routing Condition
  if (score >= PASSING_SCORE) {
    resTitle.innerText = "MATCH WON";
    resTitle.style.color = "var(--neon-emerald)";

    if (currentLevel === highestUnlockedLevel && highestUnlockedLevel < 3) {
      highestUnlockedLevel++;
    }

    totalScore += score;
    totalTimeTaken += levelTimeTaken;

    if (currentLevel < 3) {
      resMsg.innerText = `Stage 0${currentLevel} verified successfully. Click below to return to the home screen.`;
      actionBtn.innerText = "Return to Home Page";
      actionBtn.onclick = () => {
        showDashboard();
      };
    } else {
      // Level 3 passed: Advance highest level tracking to trigger the Legend celebration on dashboard load
      highestUnlockedLevel = 4;

      clearInterval(timerInterval);
      document.getElementById("quiz-screen").classList.add("hide");
      document.getElementById("result-screen").classList.add("hide");

      document.getElementById("finale-time").innerText =
        `${totalTimeTaken}s / 225s`;
      document.getElementById("finale-total-score").innerText =
        `${totalScore} / 15`;

      // Keeps the exact environment theme from Level 3 instead of switching to an unbound view style
      document.getElementById("app-viewport").className =
        "view-finale level-theme-3";
      document.getElementById("finale-screen").classList.remove("hide");
    }
  } else {
    // Level Loss Path — Log the failure context
    if (!failedLevels.includes(currentLevel)) {
      failedLevels.push(currentLevel);
    }

    resTitle.innerText = "MATCH LOST";
    resTitle.style.color = "var(--neon-rose)";
    resMsg.innerText = `Verification metrics failed. This stage can no longer be attempted.`;

    actionBtn.innerText = "Return to Home Page";
    actionBtn.onclick = () => {
      showDashboard();
    };
  }
}

function showFinaleScreen() {
  switchScreenContext("view-arena", "finale-screen");

  document.getElementById("finale-time").innerText =
    `${totalTimeTaken}s / 225s`;
  document.getElementById("finale-total-score").innerText =
    `${totalScore} / 15`;
}
