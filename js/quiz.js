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
