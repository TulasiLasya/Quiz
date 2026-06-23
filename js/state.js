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
