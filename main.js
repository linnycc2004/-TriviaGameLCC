var panel = $("#quiz-area");

var countStartNumber = 30;

// Question set
var questions = [
    
    {
        question: "What was the first full length CGI movie?",
        answers: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"],
        correctAnswer: "Toy Story",
        image: "assets\Toy Story p7.gif"
    },

    {
        question: "Which of these is NOT a name of one of the Spice Girls?",
        answers: ["Sporty Spice", "Hot Spice", "Scary Spice", "Posh Spice"],
        correctAnswer: "Hot Spice",
        image: "assets\spice girls p7.gif"
    }


]

// Variable to hold our setInterval
var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function() {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("TIME UP");
            game.timeUp();
        }
    },

    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++)
        {
            panel.append("<button class='answer-button' id='button' data-name=' " +
            questions[this.currentQuestion].answer[i] +
            "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function() {
        game.counter = countStartNumber;
        $("#counter-number").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function() {
        
    }



}