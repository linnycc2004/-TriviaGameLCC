var panel = $("#quiz-area");

var countStartNumber = 30;

// Question set
var questions = [
    
    {
        question: "Which celebrity had to issue an apology after her cellphone was hacked and all of her celebrity friends' phone numbers were posted on the internet?",
        answers: ["Britney Spears", "Kim Kardashian", "Paris Hilton", "Madonna"],
        correctAnswer: "Paris Hilton",
        image: "assets/Paris.gif"
    },

    {
        question: "Who is the highest paid model in the world?",
        answers: ["Gigi Hadid", "Alessandra Ambrosio", "Adriana Lima", "Kendall Jenner"],
        correctAnswer: "Kendall Jenner",
        image: "assets/Kendall.gif"
    },

    {
        question: "Who has the most followers on Instagram?",
        answers: ["Selena Gomez", "Cristiano Ronaldo", "Kylie Jenner", "Justin Bieber"],
        correctAnswer: "Selena Gomez",
        image: "assets/selena.gif",
    },

    {
        question: "Who died during the filming of Fast and Furious 7?",
        answers: ["Dwayne Johnson", "Paul Walker", "Jason Statham", "Michelle Rodriguez"],
        correctAnswer: "Paul Walker",
        image: "assets/paul.gif"
    },

    {
        question: "When does the Met Gala occur?",
        answers: ["The first Monday of May", "The second Tuesday of April", "The fist Monay of April", "The last Friday of March"],
        correctAnswer: "The first Monday of May",
        image: "assets/met.gif"
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
            panel.append("<button class='answer-button' id='button' data-name='" +
            questions[this.currentQuestion].answers[i] +
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
        
        clearInterval(timer);

        $("#counter-number").html(game.counter);

        panel.html("<h2>Out of Time!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        panel.append("<img src='" + questions[this.currentQuestion].image + "'/>" );

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },

    results: function() {

        clearInterval(timer);

        panel.html("<h2>All done, here's how you did!</h2>");

        $("#counter-number").html(game.counter);

        panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (game.correct + game.incorrect)) + "</h3>");
        panel.append("<br><button id='start-over'>Start Over?</button>");
        
    },

    clicked: function(e) {

        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) 
        {
            this.answeredCorrectly();
        }
        else
        {
            this.answeredIncorrectly();
        }

    },

    answeredIncorrectly: function() {

        game.incorrect++;

        clearInterval(timer);

        panel.html("<h2>Nope!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "'/>" );

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },

    answeredCorrectly: function() {

        game.correct++;

        clearInterval(timer);

        panel.html("<h2>Correct!</h2>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "'/>" );

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },

    reset: function() {

        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();

    }

};


// CLICK EVENTS
// ----------------------------------------------------------------
$(document).on("click", "#start-over", function() {
    game.reset();
});

$(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
});

$(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30 </span> Seconds</h2>");
    game.loadQuestion();
});