let time = 60 * 60;
let timerInterval;
let isPaused = false;
let questions = [];

function startTimer() {
  timerInterval = setInterval(() => {
    if (!isPaused) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      document.getElementById("time").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      if (time <= 0) {
        clearInterval(timerInterval);
        submitAnswers();
      }
      time--;
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
}

function resumeTimer() {
  isPaused = false;
}

function loadQuestions() {
  fetch("reading-questions.json")
    .then(res => res.json())
    .then(data => {
      questions = data;
      const testArea = document.getElementById("test-area");
      questions.forEach((q, i) => {
        const block = document.createElement("div");
        block.className = "question";
        block.innerHTML = `<p>${i + 1}. ${q.question}</p>`;
        q.options.forEach(opt => {
          block.innerHTML += `
            <label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br/>
          `;
        });
        testArea.appendChild(block);
      });
    });
}

function submitAnswers() {
  clearInterval(timerInterval);
  let score = 0;
  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });
  document.getElementById("result").innerText = `Your score: ${score} / ${questions.length}`;
}

window.onload = function () {
  loadQuestions();
  startTimer();
};
