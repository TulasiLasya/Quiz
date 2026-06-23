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
