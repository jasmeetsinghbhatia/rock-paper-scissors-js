// Caching the DOM for performance enhancement

const winner = "bot";

const userScore = 0;
const botScore = 0;

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

// Done with DOM caching

// Load the homepage with a random state of the game for user and the bot
let user_choices = Array(rock_you_div, paper_you_div, scissors_you_div);
let bot_choices = Array(rock_bot_div, paper_bot_div, scissors_bot_div);

let active_user_choice = get_random_choice(user_choices);
let active_bot_choice = get_random_choice(bot_choices);

// Displaying a random user and bot choice on page load
display_choice(active_user_choice);
display_choice(active_bot_choice);

console.log(`User choice on page load : ${active_user_choice.getAttribute(['data-move'])}`);
console.log(`Bot choice on page load : ${active_bot_choice.getAttribute(['data-move'])}`);

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

function get_bot_choice() {
    let count = 0;
    // Setting timer of 5 secs with intervals of 100
        let random_bot_move = setInterval(function () {
            hide_choice(active_bot_choice);
            active_bot_choice = get_random_choice(bot_choices);
            display_choice(active_bot_choice);
            console.log(count);
            count++;
            if (count === 50) {
                update_result();
                clearInterval(random_bot_move);
            }
        }, 100);
}

function start_timer() {
// start the visible timer and sync with get_bot_choice()
}

function reset_game_state() {

}

function find_winner() {
    // switch(active_user_choice.id){
    //     case rock_you
    // }

}

function update_result() {
    if (winner.valueOf() === "user") {
        result_div.textContent = `${active_user_choice.getAttribute(['data-move'])} beats ${active_bot_choice.getAttribute(['data-move'])}`;
        console.log(result_div.textContent);
    }
    else {
        result_div.textContent = `${active_bot_choice.getAttribute(['data-move'])} beats ${active_user_choice.getAttribute(['data-move'])}`;
        console.log(result_div.textContent);
    }
}

function start_game() {
    start_timer();
    get_bot_choice();
    // find_winner();
    // calculate_score();
}

