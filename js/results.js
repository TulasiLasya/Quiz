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
