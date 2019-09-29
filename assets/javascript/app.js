
$( document ).ready(function() {

    // INITIAL VALUES
        
    var counter = 0;
    var time = 15;
    var correctAnswer;
    var wrongAnswer;
       
    
    // QUESTIONS...
    var quizQuestions = [
            {
            question: "Who won the men's FIFA World Cup 2019?",
            choices: ["Brazil", "Italy","Germany","France"],
            Answer: "France",
            },
            {
            question: "How is a soccer game started",
            choices: ["Throw in", "kickoff","Punt","First pitch"],
            Answer: "Kickoff",
            },
            {
            question: "What size ball is considered full size?",
            choices: ["1", "5","8","5"],
            Answer: "5",
            },
            {
            question: "How many players are supposed to be in the game pitch during an official soccer game??",
            choices: ["11", "20","24","22"],
            Answer: "22",
            },
            {
            question: "How many substitutions per team are allowed in an offical soccer game?",
            choices: ["6", "5","8","3"],
            Answer: "3",
            },
            {
            question: " What is soccer's international championship games called?",
            choices: ["World Series", "FIFA","Supper Bowl","World Cup"],
            Answer: "World Cup",
            }
        ];

       // create question contents according to question count
function loadingContent() {
    // a for loop would be cool here...
    $("#game").append("<p><strong>" + 
    quizQuestions[counter].question + 
    "</p><p class='choices'>" + 
    quizQuestions[counter].choices[0] + 
    "</p><p class='choices'>" + 
    quizQuestions[counter].choices[1] + 
     "</p><p class='choices'>" + 
    quizQuestions[counter].choices[2] + 
    "</p><p class='choices'>" + 
    quizQuestions[counter].choices[3] + 
    "</strong></p>");
  }
  
  // user guessed correctly
  function userWin() {
    $("#game").html("<p>Yep!</p>");
    correctAnswer++;
    var Answer = quizQuestions[counter].Answer;
    $("#game").append("<p>The answer was <span class='answer'>" + 
      Answer + 
      "</span></p>" + 
      quizQuestions[counter].image);
    setTimeout(nextQuestion, 4000);
    counter++;
  }
  
  // user guessed incorrectly
  function userLoss() {
    $("#game").html("<p>Nope!</p>");
    incorrectAnswer++;
    var Answer = quizQuestions[counter].Answer;
    $("#game").append("<p>The answer was <span class='answer'>" + 
      Answer + 
      "</span></p>" + 
      quizQuestions[counter].image);
    setTimeout(nextQuestion, 4000);
    counter++;
  }
  
  // user ran out of time
  function timeOut() {
    if (time === 0) {
      $("#game").html("<p>You ran out of time!</p>");
      wrongAnswer++;
      var Answer = quizQuestions[counter].Answer;
      $("#game").append("<p>The answer was <span class='answer'>" + 
        Answer + 
        "</span></p>" + 
        quizQuestions[counter].image);
      setTimeout(nextQuestion, 4000);
      counter++;
    }
  }
  
  function resultsScreen() {
    if (correctAnswer === quizQuestions.length) {
      var endMessage = "Perfection! Might want to go outside more tho";
      var bottomText = "#nerdalert!";
    }
    else if (correctAnswer > wrongAnswer) {
      var endMessage = "Good work! But do better you can...";
      var bottomText = "all your base are belong to us";
    }
    else {
      var endMessage = "You seem to have taken an arrow to the knee";
      var bottomText = "#scrub";
    }
    $("#game").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
    correctAnswer + "</strong> right.</p>" + 
      "<p>You got <strong>" + wrongAnswer + "</strong> wrong.</p>");
    $("#game").append("<h1 id='start'>Start Over?</h1>");
    $("#bottomText").html(bottomText);
    gameReset();
    $("#start").click(nextQuestion);
  }
  
  function timer() {
    clock = setInterval(countDown, 1000);
    function countDown() {
      if (time < 1) {
        clearInterval(clock);
        timeOut();
      }
      if (time > 0) {
        time--;
      }
      $("#timer").html("<strong>" + time + "</strong>");
    }
  }
  
  function nextQuestion() {
    if (counter < quizQuestions.length) {
      time = 15;
      $("#game").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
      loadingContent();
      timer();
      timeOut();
    }
    else {
      resultsScreen();
    }
  }
  
  function gameReset() {
    counter = 0;
    correctAnswer = 0;
    wrongAnswer = 0;
  }
  
    function startGame() {
      $("#game").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
      $("#start").hide();
    
    loadingContent();
      timer();
      timeOut();
    }

   
  // Start the game...
    $("#start").click(nextQuestion);
    $("#game").on("click", ".choices", (function() {
        
    var userGuess = $(this).text();
        if (userGuess === quizQuestions[counter].Answer) {
          clearInterval(clock);
          userWin();
        }
        else {
              clearInterval(clock);
              userLoss();
       }

    }));

});
