// Caching the DOM for performance enhancement

const userScore = 0;
const botScore = 0;

const userScore_span = document.getElementById("user-score");
const botScore_span = document.getElementById("bot-score");

const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result");

const rock_you_div = document.getElementById("rock-you");
const paper_you_div = document.getElementById("paper-you");
const scissors_you_div = document.getElementById("scissors-you");

const rock_bot_div = document.getElementById("rock-bot");
const paper_bot_div = document.getElementById("paper-bot");
const scissors_bot_div = document.getElementById("scissors-bot");

// Done with DOM caching


let user_choices = Array(rock_you_div, paper_you_div, scissors_you_div);
let bot_choices = Array(rock_bot_div, paper_bot_div, scissors_bot_div);

let active_user_choice = get_random_choice(user_choices);
let active_bot_choice = get_random_choice(bot_choices);

// Displaying a random user and bot choice on page load
display_choice(active_user_choice);
display_choice(active_bot_choice);

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

async function load_bot_choice() {
    let count = 0;
    let active_bot_choice = rock_bot_div;
    while (count < 999) {
        setTimeout(function () {
            hide_choice(active_bot_choice);
            active_bot_choice = get_random_choice(bot_choices);
            display_choice(active_bot_choice);
            // console.log(active_bot_choice);
        }, 5000);
        count++;
    }
}

async function start_timer() {

}

function start_game() {
    load_bot_choice();
    start_timer();
    console.log(active_user_choice);
    console.log(active_bot_choice);

}

