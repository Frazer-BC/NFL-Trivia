const quizData = [
  {
      question: "Which of the following teams has never won the Super Bowl?",
      a: "The St Louis Rams",
      b: "The Chicago Bears",
      c: "The Minnesota Vikings",
      d: "The Oakland Raiders",
      correct: "c",
  },
  {
      question: "How many Super Bowl rings does Tom Brady have?",
      a: "five",
      b: "six",
      c: "seven",
      d: "eight",
      correct: "c",
  },
  {
      question: "Which Super Bowl winning quarterback was legally blind?",
      a: "Jim McMahon",
      b: "Kurt Warner",
      c: "Steve Young",
      d: "Terry Bradshaw",
      correct: "a",
  },
  {
      question: "Which offensive player is usually positioned the furthest back on the field?",
      a: "The fullback",
      b: "The halfback",
      c: "The quarterback",
      d: "The tight end",
      correct: "b",
  },
  {
      question: "Vince Lombardi coached which team to victory in Super Bowl I and Super Bowl II?",
      a: "The San Francisco 49ers",
      b: "The Dallas Cowboys",
      c: "The Green Bay Packers",
      d: "The Kansas City Chiefs",
      correct: "c",
  },
  {
      question: "What Year was the NFL founded?",
      a: "1910",
      b: "1920",
      c: "1930",
      d: "1940",
      correct: "b",
  },
  {
      question: "Defensive players can earn how many points by scoring a safety?",
      a: "1",
      b: "2",
      c: "3",
      d: "4",
      correct: "b",
  },
  {
      question: "Who holds the record for most career touchdowns?",
      a: "Emmit Smith",
      b: "Jim Brown",
      c: "Don Hutson",
      d: "Jerry Rice",
      correct: "d",
  },
  {
      question: "Which of these quarterbacks never won a Super Bowl?",
      a: "Drew Brees",
      b: "John Elway",
      c: "Dan Marino",
      d: "Aaron Rodgers",
      correct: "c",
  },
  {
      question: "Which NFL team was formed most recently in 2002?",
      a: "The Jacksonville Jaguars",
      b: "The Baltimore Ravens",
      c: "The Houston Texans",
      d: "The Denver Broncos",
      correct: "c",
  },
  {
      question: "How many Super Bowls have the San Francisco 49ers won?",
      a: "five",
      b: "four",
      c: "three",
      d: "two",
      correct: "a",
  },
  {
      question: "In 2023, Aaron Rodgers signed with which team?",
      a: "The Dallas Cowboys",
      b: "The San Francisco 49ers",
      c: "The New York Giants",
      d: "The New York Jets",
      correct: "d",
  },
  {
      question: "Which of the following teams is NOT named after a type of bird?",
      a: "Atlanta",
      b: "Philadelphia",
      c: "Cincinnati",
      d: "Seattle",
      correct: "c",
  },
  {
      question: "The player picked last in the draft is traditionally given which nickname?",
      a: "Mr. Nobody",
      b: "Mr. Lucky",
      c: "Mr. Unlucky",
      d: "Mr. Irrelevant",
      correct: "d",
  },
  {
      question: "Which coach has the most Super Bowl wins?",
      a: "Chuck Noll",
      b: "Bill Belichick",
      c: "Bill Walsh",
      d: "Andy Reid",
      correct: "b",
  }
];

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer-text");
const downEl = document.getElementById("down");
const timeHeadingEl = document.querySelector("#time-heading span");
const yardageHeadingEl = document.querySelector("#yardage-heading span");

let currentQuiz = 0;
let score = 0;
let down = 1;

loadQuiz();

function loadQuiz() {
  resetAnswers();
  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  answerEls[0].innerText = currentQuizData.a;
  answerEls[1].innerText = currentQuizData.b;
  answerEls[2].innerText = currentQuizData.c;
  answerEls[3].innerText = currentQuizData.d;
}

function resetAnswers() {
  answerEls.forEach(answerEl => {
      answerEl.classList.remove("correct", "incorrect");
  });
}

answerEls.forEach(answerEl => {
  answerEl.addEventListener("click", () => {
      const selectedAnswer = answerEl.getAttribute("id").replace("answer-", "");
      if (selectedAnswer === quizData[currentQuiz].correct) {
          answerEl.classList.add("correct");
          score += 10; // Add 10 yards for a correct answer
      } else {
          answerEl.classList.add("incorrect");
      }

      // Update score and down count
      yardageHeadingEl.innerText = score;
      if (down < 4) {
          down++;
      } else {
          down = 1;
      }
      downEl.innerText = `${down}${getOrdinal(down)} Down`;

      // question time delay
      setTimeout(() => {
          currentQuiz++;
          if (currentQuiz < quizData.length) {
              loadQuiz();
          } else {
              finishQuiz();
          }
      }, 1000);
  });
});

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function finishQuiz() {
  const quizArea = document.getElementById("quiz-area");
  quizArea.innerHTML = `<h2>You have completed the quiz!</h2>
                        <h3>Your Total Yardage: ${score} yards</h3>
                        <button onclick="location.reload()">Restart Game</button>`;
}
