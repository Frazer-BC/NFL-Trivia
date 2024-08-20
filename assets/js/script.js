function showStartModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.innerHTML = `
        <h1>Welcome to NFL Trivia Game!</h1>
        <p>Answer the questions below to advance across the field. Starting from your own end zone, you have 4 downs (attempts) to move the ball 10 yards down the field. Every correct answer earns you 10 yards and 4 more downs (attempts) to get the next 10 yards.</p>
        <p>To win the game, move the ball 100 yards into the opponents end zone by answering 10 questions correctly, but be aware, there's only enough time for 15 plays (questions)!</p>
        <p>If you fail 4 questions in a row, the ball is turned over to the other team and it's game over!</p>
        <button class="start" id="play-now">Play Now</button>`;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const playNowButton = document.getElementById("play-now");
    playNowButton.addEventListener("click", () => {
        // modal.style.display = "none";
        document.body.removeChild(modal);
        loadQuiz();
    });
}

window.onload = showStartModal;

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
      const selectedAnswer = answerEl.getAttribute("id");
      if (selectedAnswer === quizData[currentQuiz].correct) {
          answerEl.classList.add("correct");
          score += 10;
          down = 1;
      } else {
          answerEl.classList.add("incorrect");
          down++;
      }

    //   // Update score and down count
    //   yardageHeadingEl.innerText = score;
    //   if (down < 4) {
    //       down++;
    //   } else {
    //       down = 1;
    //   }

    //   let nth = "st"
    //   if (down == 1) {
    //     nth = "st"
    //   }
    //   if (down == 2) {
    //     nth = "nd"
    //   }
    //   if (down == 3) {
    //     nth = "rd"
    //   }
    //   if (down == 4) {
    //     nth = "th"
    //   }
        yardageHeadingEl.innerText = score;  
        const suffixes = ["th", "st", "nd", "rd"];
        const nth = suffixes[down] || "th";
      downEl.innerText = `${down}${nth}`;

       // Check if game over
       if (down > 4) {
        gameOver();
    } else {
        // Wait a bit before moving to the next question
        setTimeout(() => {
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                gameOver();
            }
        }, 1000);
    }
});
});


//       // question time delay
//       setTimeout(() => {
//           currentQuiz++;
//           if (currentQuiz < quizData.length) {
//               loadQuiz();
//           } else {
//               finishQuiz();
//           }
//       }, 1000);
//   });
// });

// function finishQuiz() {
//   const quizArea = document.getElementById("quiz-area");
//   quizArea.innerHTML = `<h2>You have completed the quiz!</h2>
//                         <h3>Your Total Yardage: ${score} yards</h3>
//                         <button onclick="location.reload()">Restart Game</button>`;
// }

function gameOver() {
    const modal = document.createElement("div");
    modal.className = "modal";
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.innerHTML = `<h2>Game Over!</h2>
                              <h3>Your Total Yardage: ${score} yards</h3>
                              <button class="start" onclick="location.reload()">Play Again</button>`;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// function finishQuiz() {
//     const quizArea = document.getElementById("quiz-area");
//     quizArea.innerHTML = `<h2>You have completed the quiz!</h2>
//                           <h3>Your Total Yardage: ${score} yards</h3>
//                           <button onclick="location.reload()">Restart Game</button>`;
// }
