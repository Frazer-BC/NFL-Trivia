// // To get the start game modal
// var modal = document.getElementById("startGame");

// var start = document.getElementsByClassName("start")[0];
// var end = document.getElementById("endGame");

// // When the user clicks play now/again, close the modal
// start.onclick = function() {
//   modal.style.display = "none";
//   end.style.display ="none";
// }

// end game modal, score 



// questions for the quiz

const quizData = [
  {
    question: "Which of the following teams has never won the Super Bowl?",
    a: "The St Louis Rams",
    b: "The Chicago Bears",
    c: "The Minnesota Vikings",
    d: "The Oakland Raiders",
    correct: "The Minnesota Vikings",
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
    question: "Vince Lombardi coached which team to victory in Super bowl I and Super Bowl II?",
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
]

const quiz = document.getElementById("quiz-area")
const choices = document.querySelectorAll(".answer-text")
const questionElement = document.getElementById("question")
const aText = document.getElementById("answer-a")
const bText = document.getElementById("answer-b")
const cText = document.getElementById("answer-c")
const dText = document.getElementById("answer-d")
const scorePoints = 10
const minQuestions = 1

let currentQuiz = 0
let score = 0
let questionCounter = 15


loadQuiz()

// function loadQuiz() {
  // const currentQuizData = quizData[currentQuiz]
  // questionElement.innerText = currentQuizData.question
  // aText.innerText = currentQuizData.a
  // bText.innerText = currentQuizData.b
  // cText.innerText = currentQuizData.c
  // dText.innerText = currentQuizData.d
// }

function loadQuiz() {
  questionCounter = 15
  score = 0
  var availableQuestions = [...quizData]
  getNewQuestion()
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter < minQuestions) {
    document.endGame.style.display = block
  }

  questionCounter--
  const questionsIndex = Math.floor(Math.random()* availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  questionElement.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset["number"]
    choice.innerText = currentQuestion["choice" + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true 

}

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset["number"]

    let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

    if (classToApply === "correct") {
      incrementScore(scorePoints)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout {() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000}
  })
})