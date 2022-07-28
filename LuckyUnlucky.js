"use strict";

const PLAYER_1_ELEMENT = document.querySelector(".player-1");
const PLAYER_2_ELEMENT = document.querySelector(".player-2");
const TOTAL_1_ELEMENT = document.querySelector(".total-1");
const TOTAL_2_ELEMENT = document.querySelector(".total-2");
const BTN_TRY_LUCK = document.querySelector(".top");
const BTN_RESET_LUCK = document.querySelector(".bottom");
const CURRENT_1_ELEMENT = document.querySelector(".borders-1");
const CURRENT_2_ELEMENT = document.querySelector(".borders-2");
const IMAGES_1 = document.querySelector(".images-1");
const IMAGES_2 = document.querySelector(".images-2");

//usable variables
let current1, current2, total1, total2, playing, player;

//function for starting initializations
const startingInitializations = function() {
    current1 = 0;   current2 = 0;   total1 = 50;   total2 = 50;   playing = true;
    PLAYER_1_ELEMENT.classList.add("active");
    PLAYER_2_ELEMENT.classList.remove("active");
    IMAGES_1.classList.add("hidden");
    IMAGES_2.classList.add("hidden");
    PLAYER_1_ELEMENT.classList.remove("winner");
    PLAYER_2_ELEMENT.classList.remove("winner");
    PLAYER_1_ELEMENT.classList.remove("looser");
    PLAYER_2_ELEMENT.classList.remove("looser");
}

startingInitializations();

//player 1 random number function
const player1Luck = function() {
    if (playing) {
        let random_value_1 = Math.trunc(Math.random() * 20) + 1;
        IMAGES_1.classList.remove("hidden");
        IMAGES_1.src = `number${random_value_1}.jpg`;
        //calculating current value basing on the random value
        if(random_value_1 === 1 ||random_value_1 ===  5 ||random_value_1 ===  10 ||random_value_1 ===  15 ||random_value_1 ===  20) {
            current1 = random_value_1;
            current1 *= 2.3;
            total1 += current1;
            CURRENT_1_ELEMENT.textContent = current1.toFixed(2); 
            TOTAL_1_ELEMENT.textContent = total1.toFixed(2);  
            //checking whether player 1 is able to win
            if(total1 >= 100) {
                playing = false;
                PLAYER_1_ELEMENT.classList.add("winner");
                PLAYER_2_ELEMENT.classList.add("looser");
                document.querySelector("body").style.backgroundColor = "blue";
                IMAGES_1.src = "winner1.jpeg";
                alert(`PLAYER 1 WON\nReason: Player 1 reached a maximum value of $100\n\nPLAYER 2 LOST\nReason: Player 2 had a lower value of $${total2}`);
            } else {
                switchPlayer();
            } 

        //else for calculating current value basing on the random value
        } else {
            current1 = random_value_1;
            total1 -= current1;
            CURRENT_1_ELEMENT.textContent = current1.toFixed(2);; 
            TOTAL_1_ELEMENT.textContent = total1.toFixed(2);;
            if (total1 <= 0) {
                playing = false;
                PLAYER_1_ELEMENT.classList.add("looser");
                PLAYER_2_ELEMENT.classList.add("winner");
                document.querySelector("body").style.backgroundColor = "blue";
                IMAGES_1.src = "looser.png";
                random_value_1 = 0;
                CURRENT_1_ELEMENT.textContent = current1.toFixed(2);;
                alert(`PLAYER 2 WON\nReason: Player 1 reached a minimum value of $0\n\nPLAYER 1 LOST\nReason: Player 2 had a higher value of $${total2}`);
            } else {
                switchPlayer();
            }
        }
    }
}


//player 2 random number function
const player2Luck = function() {
    if (playing) {
        let random_value_2 = Math.trunc(Math.random() * 20) + 1;
        IMAGES_2.classList.remove("hidden");
        IMAGES_2.src = `number${random_value_2}.jpg`;
        //calculating current value basing on the random value
        if(random_value_2 === 1 ||random_value_2 ===  5 ||random_value_2 ===  10 ||random_value_2 ===  15 ||random_value_2 ===  20) {
            current2 = random_value_2;
            current2 *= 2.3;
            total2 += current2;
            CURRENT_2_ELEMENT.textContent = current2.toFixed(2);; 
            TOTAL_2_ELEMENT.textContent = total2.toFixed(2);;  
            //checking whether player 1 is able to win
            if(total2 >= 100) {
                playing = false;
                IMAGES_2.src = "winner1.jpeg";
                PLAYER_2_ELEMENT.classList.add("winner");
                PLAYER_1_ELEMENT.classList.add("looser");
                document.querySelector("body").style.backgroundColor = "blue";
                alert(`PLAYER 2 WON\nReason: Player 2 reached a maximum value of $100\n\nPLAYER 1 LOST\nReason: Player 1 had a lower value of $${total1}`);
            } else {
                switchPlayer();
            }    
        //else for calculating current value basing on the random value
        } else {
            current2 = random_value_2;
            total2 -= current2;
            CURRENT_2_ELEMENT.textContent = current2.toFixed(2);; 
            TOTAL_2_ELEMENT.textContent = total2.toFixed(2);;
            if (total2 <= 0) {
                playing = false;
                PLAYER_1_ELEMENT.classList.add("winner");
                PLAYER_2_ELEMENT.classList.add("looser");
                document.querySelector("body").style.backgroundColor = "blue";
                IMAGES_2.src = "looser.png";
                CURRENT_2_ELEMENT.textContent = current2.toFixed(2);;
                alert(`PLAYER 1 WON\nReason: Player 2 reached a minimum value of $0\n\nPLAYER 2 LOST\nReason: Player 1 had a higher value of $${total1}`);
            } else {
                switchPlayer();
            }
        }
    }
}

//function for switching players
const switchPlayer = function() {
    PLAYER_2_ELEMENT.classList.toggle("active");
    PLAYER_1_ELEMENT.classList.toggle("active");
}

//function for try luck
const tryLuck = function() {
        //if player 1 is active
    if (PLAYER_1_ELEMENT.classList.contains("active")) {
    player1Luck();
    IMAGES_2.classList.add("hidden");
    CURRENT_2_ELEMENT.textContent = 0;

        //if player 2 is active
    } else if (PLAYER_2_ELEMENT.classList.contains("active")) {
    player2Luck();
    IMAGES_1.classList.add("hidden");
    CURRENT_1_ELEMENT.textContent = 0;
    }
}


//function for resetting luck
const resetLuck = function() {
    startingInitializations();
    CURRENT_1_ELEMENT.textContent = current1;
    CURRENT_2_ELEMENT.textContent = current2;
    TOTAL_1_ELEMENT.textContent = total1;;
    TOTAL_2_ELEMENT.textContent = total2;
    document.querySelector("body").style.backgroundColor = "lime";
}


//adding functionality at try your luck button
BTN_TRY_LUCK.addEventListener("click",tryLuck);

//adding functionality at reset your luck button
BTN_RESET_LUCK.addEventListener("click",resetLuck);