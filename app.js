// Caching the DOM for performance enhancement

let userScore = 0;
let botScore = 0;
let winner = "Its a Tie. Play Again.";

const userScore_span = document.getElementById("user-score");
const botScore_span = document.getElementById("bot-score");

const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector("#result-text");

const rock_you_div = document.getElementById("rock-you");
const paper_you_div = document.getElementById("paper-you");
const scissors_you_div = document.getElementById("scissors-you");

const rock_bot_div = document.getElementById("rock-bot");
const paper_bot_div = document.getElementById("paper-bot");
const scissors_bot_div = document.getElementById("scissors-bot");

const play_button = document.getElementById("play-btn");

// Done with DOM caching

// Load the homepage with a random state of the game for user and the bot
let user_choices = Array(rock_you_div, paper_you_div, scissors_you_div);
let bot_choices = Array(rock_bot_div, paper_bot_div, scissors_bot_div);

let active_user_choice = get_random_choice(user_choices);
let active_bot_choice = get_random_choice(bot_choices);


// Displaying a random user and bot choice on page load
display_choice(active_user_choice);
display_choice(active_bot_choice);

let user_move = active_user_choice.getAttribute(['data-move']);
let bot_move = active_bot_choice.getAttribute(['data-move']);

console.log(`Your default move on page load : ${user_move}`);
console.log(`Bot's default move on page load : ${bot_move}`);

// Event listener for user click to select a move from Rock/Paper/Scissors
rock_you_div.addEventListener("click", function () {
    hide_choice(rock_you_div);
    active_user_choice = paper_you_div;
    display_choice(active_user_choice);
});

paper_you_div.addEventListener("click", function () {
    hide_choice(paper_you_div);
    active_user_choice = scissors_you_div;
    display_choice(active_user_choice);
});

scissors_you_div.addEventListener("click", function () {
    hide_choice(scissors_you_div);
    active_user_choice = rock_you_div;
    display_choice(active_user_choice);
});


function display_choice(choice) {
    choice.style.display = "inline-block";
}

function hide_choice(choice) {
    choice.style.display = "none";
}

function get_random_choice(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}

async function start_game() {
    play_button.disabled= true;
    play_button.textContent = "Bot is 🤔";
    play_button.style.background = "#666";
    get_bot_choice()
        .then(evaluate_game)
        .then(reset_play_button);
}

let get_bot_choice = function () {
    return new Promise(function (resolve) {
        start_timer();
        let count = 1;
        // Setting timer of 5 secs with intervals of 100ms
        let random_bot_move = setInterval(function () {
            hide_choice(active_bot_choice);
            active_bot_choice = get_random_choice(bot_choices);
            display_choice(active_bot_choice);
            console.log(count);

            if (count === 10) {
                clearInterval(random_bot_move);
                console.log('Random Bot Move Completed');
                resolve({status1: 'function run completed'});
            }
            count++;
        }, 500);
    });
};

let evaluate_game = function (completion_message) {
    return new Promise(function (resolve) {
        user_move = active_user_choice.getAttribute(['data-move']);
        bot_move = active_bot_choice.getAttribute(['data-move']);

        if (user_move !== bot_move) {
            switch (user_move) {
                case "Rock":
                    if (bot_move === "Paper") {
                        winner = "Bot";
                    }
                    else winner = "You";
                    break;

                case "Paper":
                    if (bot_move === "Scissors") {
                        winner = "Bot";
                    }
                    else winner = "You";
                    break;

                case "Scissors":
                    if (bot_move === "Rock") {
                        winner = "Bot";
                    }
                    else winner = "You";
                    break;
            }
        }
        play_button.textContent = "updating score";
        play_button.style.background = "#666";
        update_result(winner);
        console.log('Evaluation for the game is completed');
        resolve({status2: completion_message.status1});

    });
};

let reset_play_button = function (completion_message) {
    //    Reset result text
    //    Reset switch to start the game state
    return new Promise(function (resolve) {
        setTimeout(function () {
            if (winner !== "Its a Tie. Play Again." ){
                result_div.textContent = "Score updated, play Again ?";
            }
            console.log(winner);
            play_button.disabled= false;
            play_button.textContent = "Click to Play";
            play_button.style.background = "#67BDB9";
            resolve({result: completion_message.status2});
        }, 3000);
    });
};

function start_timer() {
// start the visible timer and sync with get_bot_choice()
    let count = 4;
    result_div.textContent = `${count + 1} seconds remaining`;

    let timer = setInterval(function () {
        result_div.textContent = `${count} seconds remaining`;
        if (count === 1) {
            clearInterval(timer);
        }
        count--;
    }, 1000);

}

function update_result(winner) {
    if (winner.valueOf() === "You") {
        result_div.textContent = `${user_move} beats ${bot_move}, ${winner} Win!`;
    }
    else if (winner.valueOf() === "Bot") {
        result_div.textContent = `${bot_move} beats ${user_move}, ${winner} Wins!`;
    }

    else result_div.textContent = winner;
}
