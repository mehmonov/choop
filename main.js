const latinTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is fun when you practice regularly."
];
const cyrillicTexts = [
  "Шу зўр бурғут қашшоқ ит устидан сакради.",
  "Ёзиш тезлигини машқ қилиш билан ошириш мумкин."
];

const latinBtn = document.getElementById("latin-btn");
const cyrillicBtn = document.getElementById("cyrillic-btn");
const testText = document.getElementById("test-text");
const typingArea = document.getElementById("typing-area");
const startBtn = document.getElementById("start-btn");
const results = document.getElementById("results");
const speedDisplay = document.getElementById("speed");
const errorsDisplay = document.getElementById("errors");
const timeDisplay = document.getElementById("time");
const incorrectWordsDisplay = document.getElementById("incorrect-words");

let startTime = null;
let isCyrillic = false;
let wordsArray = [];
let isTestRunning = false;

function getRandomText(isCyrillic) {
  const texts = isCyrillic ? cyrillicTexts : latinTexts;
  return texts[Math.floor(Math.random() * texts.length)];
}

function setTestText() {
  const text = getRandomText(isCyrillic);
  wordsArray = text.split(" ");
  testText.innerHTML = wordsArray
    .map((word) => `<span>${word}</span>`)
    .join(" ");
}

function resetTest() {
  typingArea.value = "";
  results.classList.add("hidden");
  startTime = null;
  testText.innerHTML = "";
  isTestRunning = false;
}

startBtn.addEventListener("click", () => {
  resetTest();
  setTestText();
  startTime = new Date();
  isTestRunning = true;
  typingArea.focus();
});

latinBtn.addEventListener("click", () => {
  isCyrillic = false;
  resetTest();
  setTestText();
});

cyrillicBtn.addEventListener("click", () => {
  isCyrillic = true;
  resetTest();
  setTestText();
});

typingArea.addEventListener("input", () => {
  if (!isTestRunning) return;

  const typedText = typingArea.value.trim();
  const typedWords = typedText.split(" ");

  let errors = 0;
  let incorrectWords = [];

  wordsArray.forEach((word, index) => {
    const span = testText.children[index];
    if (!typedWords[index]) {
      // Agar foydalanuvchi bu so'zni hali yozmagan bo'lsa
      span.className = "";
    } else if (typedWords[index] === word) {
      span.className = "text-green-500";
    } else if (index < typedWords.length - 1 || typedWords[index].endsWith(" ")) {
      span.className = "text-red-500";
      errors++;
      incorrectWords.push(word);
    } else {
      span.className = "";
    }
  });

  if (typedWords.length >= wordsArray.length && typedWords[wordsArray.length - 1] === wordsArray[wordsArray.length - 1]) {
    const elapsedTime = (new Date() - startTime) / 1000;
    const speed = Math.round((typedWords.length / elapsedTime) * 60);

    speedDisplay.innerText = speed;
    errorsDisplay.innerText = errors;
    incorrectWordsDisplay.innerText = incorrectWords.join(", ") || "None";
    timeDisplay.innerText = elapsedTime.toFixed(2);
    results.classList.remove("hidden");
    isTestRunning = false;
  }
});
