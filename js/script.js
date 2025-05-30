/* global monogatari */

// Define the messages used in the game.
monogatari.action("message").messages({
  Help: {
    title: "Help",
    subtitle: "Some useful Links",
    body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`,
  },
});

// Define the notifications used in the game
monogatari.action("notification").notifications({
  Welcome: {
    title: "Welcome to Understanding Microaggressions",
    body: "An interactive learning experience about recognizing and addressing microaggressions",
    icon: "",
  },
});

// Define the Particles JS Configurations used in the game
monogatari.action("particles").particles({});

// Define the canvas objects used in the game
monogatari.action("canvas").objects({});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration("credits", {});

// Define the images that will be available on your game's image gallery
monogatari.assets("gallery", {});

// Define the music used in the game.
monogatari.assets("music", {
  main_theme: "main_theme.mp3",
  study_room: "quiz_theme.mp3",
  cafe: "quiz_theme.mp3",
  classroom: "quiz_theme.mp3",
  ending: "ending_theme.mp3",
});

// Define the voice files used in the game.
monogatari.assets("voices", {
  alex: "alex-voice.mp3",
  others: "others-voice.mp3",
  player: "player-voice.mp3",
});

// Define the sounds used in the game.
monogatari.assets("sounds", {});

// Define the videos used in the game.
monogatari.assets("videos", {});

// Define the images used in the game.
monogatari.assets("images", {});

// Define the backgrounds for each scene.
monogatari.assets("scenes", {
  "main-menu": "centralpark.jpg",
  study_room: "study-room.jpg",
  cafe: "cafe.jpg",
  classroom: "gym.jpeg",
  ending: "ending.jpg",
  quiz_scene: "quiz.jpg",
});

// Define the Characters
monogatari.characters({
  player: {
    name: "{{player.name}}",
    color: "#f39c12",
  },
  alex: {
    name: "Alex",
    color: "#ffb700",
    directory: "alex",
    sprites: {
      default: "neutral.png",
      greet: "greet.png",
      explaining: "explaining.png",
      concerned: "concerned.png",
      happy: "happy.png",
      serious: "serious.png",
    },
  },
  classmate: {
    name: "Classmate",
    color: "#00d5ff",
    directory: "classmate",
    sprites: {
      default: "default.png",
    },
  },
  manager: {
    name: "Manager",
    color: "#ee55ff",
    directory: "manager",
    sprites: {
      default: "default.png",
    },
  },
});

monogatari.script({
  // The game starts here.
  Start: [
    "show scene main-menu with fadeIn",
    "play music main_theme with loop fade 2",
    "show notification Welcome",
    {
      Input: {
        Text: "Before we begin, what is your name?",
        Validation: function (input) {
          return input.trim().length > 0;
        },
        Save: function (input) {
          monogatari.storage({
            player: {
              name: input,
            },
          });
          return true;
        },
        Revert: function () {
          monogatari.storage({
            player: {
              name: "",
            },
          });
        },
        Warning: "Please enter your name to continue.",
      },
    },
    {
      // Modify the existing Start scene to jump to the target chapter after name input
      Function: {
        Apply: function () {
          const chapter = new URLSearchParams(window.location.search).get(
            "chapter"
          );

          if (chapter === "quiz") {
            monogatari.run("jump Dynamic_Quiz_1");
            return false;
          }
          if (chapter === "Chapter1") {
            monogatari.run("jump Chapter1");
            return false;
          }
          if (chapter === "Chapter2") {
            monogatari.run("jump Chapter2");
            return false;
          }
          if (chapter === "Chapter3") {
            monogatari.run("jump Chapter3");
            return false;
          }

          monogatari.run("jump Intro");
          return false;
        },
        Revert: function () {
          // No state to revert — safe no-op
        },
      },
    },
  ],

  Intro: [
    "play music main_theme with loop fade 2",
    "show character alex greet at center with fadeIn",
    "play voice alex",
    "alex Welcome {{player.name}}! I'm Alex, and I'll be your guide through this interactive learning experience about microaggressions.",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    "alex Microaggressions are small comments or actions that can feel dismissive or hurtful.",
    "next",
    "play voice alex",
    "alex There are three main types I want you to know about:",
    "next",
    "show character alex serious at center with fadeIn",
    "play voice alex",
    "alex Microassaults are more direct, and usually intentional.",
    "next",
    "play voice alex",
    "show character alex concerned at center with fadeIn",
    "alex Microinsults are sneaky insults hiding inside what sounds like praise.",
    "next",
    "play voice alex",
    "show character alex serious at center with fadeIn",
    "alex Finally, microinvalidations minimize or ignore someone's lived experiences. It undermines their feelings, identity and challenges.",
    "next",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Let's dive in and see what they look like.",
    "jump Chapter1",
  ],

  Chapter1: [
    "stop music with fade 1",
    "show scene study_room with fadeIn",
    "play music study_room with loop fade 2",
    "show character alex default at center with fadeIn",
    "next",
    "hide character alex",
    "show character classmate default at center with fadeIn",
    "play voice others",
    "classmate Wow, your English is so good! Where are you really from? ",
    "next",
    "player <div class='inner-thought'>I've spoken English my whole life... Why do people always ask me that?</div>",
    "next",
    {
      Choice: {
        "Smile awkwardly": {
          Text: "Smile awkwardly and change the topic",
          Do: "jump Chapter1_Feedback1",
        },
        "Say from here": {
          Text: "Say: “I'm from here. Why do you ask?\"",
          Do: "jump Chapter1_Feedback2",
        },
        "Laugh about Mars": {
          Text: "Laugh and say, “I'm from Mars.\"",
          Do: "jump Chapter1_Feedback3",
        },
      },
    },
  ],

  Chapter1_Feedback1: [
    "player <i>Smiles awkwardly and change the topic.</i>",
    "show scene study_room with fadeIn",
    "show character classmate default at center with fadeIn",
    "next",
    "hide character classmate",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Sometimes we freeze and move on. That's totally normal.",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    "alex But it's also okay to gently call attention to comments that don't sit right with you.",
    "next",
    "jump Chapter1_Quiz",
  ],

  Chapter1_Feedback2: [
    "play voice player",
    "player I'm from here. Why do you ask?",
    "show scene study_room with fadeIn",
    "show character classmate default at center with fadeIn",
    "next",
    "hide character classmate",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Good response!",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    "alex You're making them think about why they felt the need to question your belonging — without starting a fight.",
    "next",
    "jump Chapter1_Quiz",
  ],

  Chapter1_Feedback3: [
    "play voice player",
    "player I'm from Mars.",
    "show scene study_room with fadeIn",
    "show character classmate default at center with fadeIn",
    "next",
    "hide character classmate",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Humor can deflect the awkwardness.",
    "next",
    "show character alex serious at center with fadeIn",
    "play voice alex",
    "alex But remember, you have every right to ask for respect too.",
    "next",
    "jump Chapter1_Quiz",
  ],

  Chapter1_Quiz: [
    "show character alex serious at center with fadeIn",
    "play voice alex",
    "alex Why is this considered a microaggression?",
    "next",
    {
      Choice: {
        "Questioned belonging": {
          Text: "It questioned your belonging based on stereotypes",
          Do: "jump Chapter1_Quiz_Correct",
        },
        "Friendly compliment": {
          Text: "It was just a friendly compliment",
          Do: "jump Chapter1_Quiz_Incorrect1",
        },
        "Trying to be funny": {
          Text: "They were trying to be funny",
          Do: "jump Chapter1_Quiz_Incorrect2",
        },
      },
    },
  ],

  Chapter1_Quiz_Correct: [
    "play voice player",
    "player It questioned my belonging based on stereotypes.",
    "show character alex happy at center with fadeIn",
    "play voice alex",
    "alex Exactly!",
    "next",
    "show character alex serious at center with fadeIn",
    "play voice alex",
    "alex Even if it sounds polite, it's about suggesting you don't fully belong because of who you are.",
    "next",
    "jump Chapter2",
  ],

  Chapter1_Quiz_Incorrect1: [
    "play voice player",
    "player It was just a friendly compliment.",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Almost.",
    "next",
    "show character alex serious at center with fadeIn",
    "play voice alex",
    "alex Even when words sound friendly or funny, they can still carry hidden assumptions.",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    'alex The key is: did the comment make you feel “othered" or different based on your identity?',
    "next",
    "jump Chapter2",
  ],

  Chapter1_Quiz_Incorrect2: [
    "play voice player",
    "player They were trying to be funny.",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Almost.",
    "next",
    "show character alex serious at center with fadeIn",
    "play voice alex",
    "alex Even when words sound friendly or funny, they can still carry hidden assumptions.",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    "alex The key is: did the comment make you feel 'othered' or different based on your identity?",
    "next",
    "jump Chapter2",
  ],

  Chapter2: [
    "stop music with fade 1",
    "show scene cafe with fadeIn",
    "play music cafe with loop fade 2",
    "show character alex default at center with fadeIn",
    "next",
    "hide character alex",
    "show character manager default at center with fadeIn",
    "play voice others",
    "manager We need someone who fits the vibe here... if you know what I mean.",
    "next",
    "player <div class='inner-thought'>Feels like they're saying I don't fit in — but they won't say it directly.</div>",
    "next",
    {
      Choice: {
        "Ask about vibe": {
          Text: "Ask: “What do you mean by 'vibe'?\"",
          Do: "jump Chapter2_Feedback1",
        },
        "Stay quiet": {
          Text: "Assume it's about your clothes and stay quiet",
          Do: "jump Chapter2_Feedback2",
        },
        Leave: {
          Text: "Leave without saying anything",
          Do: "jump Chapter2_Feedback3",
        },
      },
    },
  ],

  Chapter2_Feedback1: [
    "play voice player",
    'player What do you mean by “vibe"?',
    "show scene cafe with fadeIn",
    "show character manager default at center with fadeIn",
    "next",
    "hide character manager",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Nice — asking puts the responsibility back on them to explain themselves.",
    "next",
    "jump Chapter2_Quiz",
  ],

  Chapter2_Feedback2: [
    "player <i>Assumes it's about your clothes and stay quiet</i>",
    "show scene cafe with fadeIn",
    "show character manager default at center with fadeIn",
    "next",
    "hide character manager",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Totally understandable.",
    "next",
    "play voice alex",
    "alex Sometimes it feels safer to stay quiet.",
    "next",
    "show character alex serious at center with fadeIn",
    "play voice alex",
    "alex Just remember — it's okay to ask for clarification if something feels off.",
    "next",
    "jump Chapter2_Quiz",
  ],

  Chapter2_Feedback3: [
    "player <i>Leaves without saying anything.</i>",
    "show scene cafe with fadeIn",
    "show character manager default at center with fadeIn",
    "next",
    "hide character manager",
    "show character alex serious at center with fadeIn",
    "play voice alex",
    "alex Walking away protects your peace — but sometimes it also lets bias go unchallenged.",
    "next",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Always choose what feels safest for you.",
    "next",
    "jump Chapter2_Quiz",
  ],

  Chapter2_Quiz: [
    "show character alex serious at center with fadeIn",
    "play voice alex",
    "alex What makes this situation a microassault?",
    "next",
    {
      Choice: {
        "Direct and intentional": {
          Text: "It was more direct and intentional",
          Do: "jump Chapter2_Quiz_Correct",
        },
        Misunderstanding: {
          Text: "It was just a misunderstanding",
          Do: "jump Chapter2_Quiz_Incorrect1",
        },
        "Being funny": {
          Text: "It's actually a microinvalidation.",
          Do: "jump Chapter2_Quiz_Incorrect2",
        },
      },
    },
  ],

  Chapter2_Quiz_Correct: [
    "play voice player",
    "player It was more direct and intentional.",
    "show character alex happy at center with fadeIn",
    "play voice alex",
    "alex Exactly!",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    "alex Microassaults are usually subtle, but there's more purpose and bias behind them.",
    "next",
    "jump Chapter3",
  ],

  Chapter2_Quiz_Incorrect1: [
    "play voice player",
    "player It was just a misunderstanding.",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Not quite.",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    "alex Microassaults aren't accidents — they usually carry some intent, even if the person hides it under vague words.",
    "next",
    "jump Chapter3",
  ],

  Chapter2_Quiz_Incorrect2: [
    "play voice player",
    "player It's actually a microinvalidation.",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex It could totally be depending on how you felt!",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    "alex What makes microassaults differ from microinvalidations is that they often aren't accidents.",
    "alex They usually carry some intent, even if the person hides it under vague words.",
    "next",
    "jump Chapter3",
  ],

  Chapter3: [
    "stop music with fade 1",
    "show scene classroom with fadeIn",
    "play music classroom with loop fade 2",
    "show character alex default at center with fadeIn",
    "next",
    "hide character alex",
    "show character classmate default at center with fadeIn",
    "play voice others",
    "classmate Wow, I didn't expect you to be this good!",
    "next",
    "player <div class='inner-thought'>Wait... why wouldn't you expect that?</div>",
    "next",
    {
      Choice: {
        "Say thanks": {
          Text: "Say thanks and move on",
          Do: "jump Chapter3_Feedback1",
        },
        "Ask why": {
          Text: "Ask, “Why wouldn't you expect that?\"",
          Do: "jump Chapter3_Feedback2",
        },
        "Laugh it off": {
          Text: "Laugh it off and change the subject",
          Do: "jump Chapter3_Feedback3",
        },
      },
    },
  ],

  Chapter3_Feedback1: [
    "play voice player",
    "player Thanks... Anyways...",
    "show scene classroom with fadeIn",
    "show character classmate default at center with fadeIn",
    "next",
    "hide character classmate",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex It's okay to move on.",
    "next",
    "show character alex concerned at center with fadeIn",
    "play voice alex",
    "alex But if it leaves a weird feeling, trust yourself — you're picking up on something real.",
    "next",
    "jump Chapter3_Quiz",
  ],

  Chapter3_Feedback2: [
    "play voice player",
    "player Why wouldn't you expect that?",
    "show scene classroom with fadeIn",
    "show character classmate default at center with fadeIn",
    "next",
    "hide character classmate",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Perfect — you're inviting them to reflect without being hostile.",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    "alex Sometimes that's all it takes to plant a seed of awareness.",
    "next",
    "jump Chapter3_Quiz",
  ],

  Chapter3_Feedback3: [
    "play voice player",
    "player Haha, yeah...",
    "show scene classroom with fadeIn",
    "show character classmate default at center with fadeIn",
    "next",
    "hide character classmate",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Humor can soften awkward moments.",
    "next",
    "show character alex serious at center with fadeIn",
    "play voice alex",
    "alex But remember, you don't have to pretend comments like that are harmless if they don't feel good.",
    "next",
    "jump Chapter3_Quiz",
  ],

  Chapter3_Quiz: [
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex What makes this a microinsult?",
    "next",
    {
      Choice: {
        "Hidden insult": {
          Text: "It's a hidden insult inside a compliment",
          Do: "jump Chapter3_Quiz_Correct",
        },
        "Bad wording": {
          Text: "It was just bad wording",
          Do: "jump Chapter3_Quiz_Incorrect",
        },
        Compliment: {
          Text: "It was totally a compliment",
          Do: "jump Chapter3_Quiz_Incorrect",
        },
      },
    },
  ],

  Chapter3_Quiz_Correct: [
    "show character alex happy at center with fadeIn",
    "play voice alex",
    "alex Exactly!",
    "next",
    "play voice alex",
    "show character alex explaining at center with fadeIn",
    "alex It sounds like praise, but it actually reinforces a stereotype.",
    "next",
    "jump Ending",
  ],

  Chapter3_Quiz_Incorrect: [
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Close, but not quite.",
    "next",
    "show character alex concerned at center with fadeIn",
    "play voice alex",
    "alex Even when the words sound nice, if they carry surprise or low expectations about someone's identity — it's a microinsult.",
    "next",
    "jump Ending",
  ],

  PostQuizEnding: [
    "show scene ending with fadeIn",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Today you learned how to spot microaggressions, microassaults, and microinsults — and why they matter.",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    "alex Even small words can carry big messages.",
    "next",
    "play voice alex",
    "show character alex default at center with fadeIn",
    "alex It's okay to notice them. It's okay to respond.",
    "next",
    "play voice alex",
    "alex You deserve to be seen, heard, and respected — always.",
    {
      Function: {
        Apply: function () {
          const score = monogatari.storage("quizScore") || 0;
          return `You got ${score} out of 5 questions correct!`;
        },
        Return: function (line) {
          return line;
        },
      },
    },
    "next",
    "show character alex greet at center with fadeIn",
    "Thank you for playing!",
    "end",
  ],

  Ending: [
    "stop music with fade 1",
    "show scene ending with fadeIn",
    "play music ending with loop fade 2",
    "show character alex happy at center with fadeIn",
    "play voice alex",
    "alex You made it through!",
    "next",
    "show character alex explaining at center with fadeIn",
    "play voice alex",
    "alex Before we wrap up, let us see what you learned.",
    "next",
    "jump Dynamic_Quiz_1",
    "next",
    "show character alex default at center with fadeIn",
    "play voice alex",
    "alex Today you learned how to spot microaggressions, microassaults, and microinsults — and why they matter.",
    "next",
    "show character alex explaning at center with fadeIn",
    "play voice alex",
    "alex Even small words can carry big messages.",
    "next",
    "play voice alex",
    "alex It's okay to notice them. It's okay to respond.",
    "next",
    "play voice alex",
    "show character alex default at center with fadeIn",
    "alex You deserve to be seen, heard, and respected — always.",
    "next",
    "Thank you for playing!",
    "end",
  ],
});

// === Load Quiz Data Dynamically ===
function generateQuizScenes(quizData) {
  monogatari.on("start", () => {
    generateQuizScenes(quizData);
  });

  // Initialize score tracking
  monogatari.storage({
    quizScore: 0,
    quizMissed: [],
    quizSelections: {}, // Track user selections for each question
  });

  const scriptBlocks = {};
  quizData.questions.forEach((q, index) => {
    const label = `Dynamic_Quiz_${index + 1}`;
    const nextLabel =
      index + 1 < quizData.questions.length
        ? `Dynamic_Quiz_${index + 2}`
        : `Dynamic_Quiz_End`;

    const choices = {};
    q.options.forEach((opt, i) => {
      const feedbackLabel = `${label}_Feedback_${i}`;
      choices[opt.text] = { Text: opt.text, Do: `jump ${feedbackLabel}` };

      scriptBlocks[feedbackLabel] = [
        "show scene classroom",
        opt.isCorrect
          ? "show character alex happy at center with fadeIn"
          : "show character alex explaining at center with fadeIn",
        {
          Function: {
            Apply: function () {
              const prevState = {
                score: this.storage("quizScore"),
                missed: [...(this.storage("quizMissed") || [])],
                selections: { ...(this.storage("quizSelections") || {}) },
              };
              this.temp("quizPrevState_" + index, prevState);

              // Update selections
              let selections = { ...prevState.selections };
              selections[index] = i;

              if (opt.isCorrect) {
                this.storage({
                  quizScore: prevState.score + 1,
                  quizSelections: selections,
                });
              } else {
                let missed = [...prevState.missed];
                if (!missed.includes(index)) {
                  missed.push(index);
                }
                this.storage({
                  quizMissed: missed,
                  quizSelections: selections,
                });
              }

              return true;
            },
            Revert: function () {
              const prev = this.temp("quizPrevState_" + index);
              if (prev) {
                this.storage({
                  quizScore: prev.score,
                  quizMissed: prev.missed,
                  quizSelections: prev.selections,
                });
              }
            },
          },
        },
        `alex ${opt.isCorrect ? q.feedback.correct : q.feedback.incorrect}`,
        `jump ${nextLabel}`,
      ];
    });

    scriptBlocks[label] = [
      "show scene classroom with fadeIn",
      "show character alex default at center with fadeIn",
      `alex ${q.text}`,
      { Choice: choices },
    ];
  });

  // Add ending label with score tracking and redirection
  scriptBlocks["Dynamic_Quiz_End"] = [
    "show scene classroom with fadeIn",
    "show character alex happy at center with fadeIn",
    "alex Great job completing the quiz!",
    "show character alex default at center with fadeIn",
    "alex Today you learned how to spot microaggressions, microassaults, and microinsults — and why they matter.",
    "next",
    "show character alex explaining at center with fadeIn",
    "alex Even small words can carry big messages.",
    "next",
    "alex It's okay to notice them. It's okay to respond.",
    "next",
    "show character alex default at center with fadeIn",
    "alex You deserve to be seen, heard, and respected — always.",
    "next",
    "alex Thank you for playing!",

    {
      Function: {
        Apply: function () {
          // Get the score, missed questions, and selections
          const score = this.storage("quizScore") || 0;
          const missed = this.storage("quizMissed") || [];
          const selections = this.storage("quizSelections") || {};
          const total = quizData.questions.length;

          // Make sure missed questions are properly formatted
          const missedString = missed.length > 0 ? missed.join(",") : "";

          // Convert selections object to JSON string
          const selectionsJSON = JSON.stringify(selections);

          // Log the values for debugging
          console.log("Score:", score);
          console.log("Total:", total);
          console.log("Missed:", missedString);
          console.log("Selections:", selectionsJSON);

          // Send the results to the server
          fetch("/save-quiz-result", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              score: score,
              total: total,
              missed: missedString,
              selections: selectionsJSON,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                // Redirect to the results page
                window.location.href = data.url;
              } else {
                console.error("Failed to save quiz result");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });

          return true;
        },
      },
    },
    'alex "Let\'s see your results!"',
  ];

  monogatari.script(scriptBlocks);
}

// Load the quiz data and generate Monogatari script from it
generateQuizScenes(quizData);
