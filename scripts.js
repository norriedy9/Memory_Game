/* 
    Students! You will all be completing this matching card game.
    Follow the directions throughout this file to slowly build out 
    the game's features.
*/


// These are all the symbols that the game is going to use
const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];
// You're going to need this to display the cards on the screen (remember there should be two of each card)
let cards = [];
// These will be used when the user starts choosing cards
let firstCard = null, secondCard = null;
// You will need to lock the board to stop users from choosing cards when they choose two wrong cards
// (Don't have to worry about this too much)
let lockBoard = false;

/* 
    You must initialize the game board. You have been given a shuffleArray() function.
    This function should also reset the entire game board by making sure there's no HTML inside of the game-board div.
    Use the createCard() function to initialize each cardElement and add it to the gameBoard.

*/
function initGame() {

    resetBoard();
    //reset entire game board!
    document.getElementById("game-board").innerHTML = "";
    for(let i = 0; i < 16; i++)
    {
        cards.pop();
    }
    


    //first, assign two cards to each emoji
    for(let i = 0; i < symbols.length; i++)
    {
        //do this twice
        createCard(symbols[i]);
        createCard(symbols[i]);
    }

    //then, shuffle game
    shuffleArray(cards);

    //make sure the cards are also shuffled in the board
    cards.forEach(card => document.getElementById("game-board").appendChild(card));

    document.getElementById('restart-btn').addEventListener('click', initGame);
}

/*
    The card will have the css class 'card' and it would be a good idea to somehow save what its symbol is
    within the element itself, since we'll need it for later and there's no easy way to get it from the arrays.
    For this, you should look up the "dataset" property in HTML.
    Also make sure to add the event listener with the 'flipCard' function
*/
function createCard(symbol) 
{
    const newCard = document.createElement('button'); //creates a new button (aka card)
    document.getElementById("game-board").appendChild(newCard); //adds card to game-board
    newCard.className = "card"; //adds card class to new card
    newCard.dataset.symbol = symbol; //adds symbol attribute, and sets it to symbol from parameter

    newCard.addEventListener('click', () => flipCard(newCard)); //adds event listener w/ 'flipCard' function
    cards.push(newCard);

}

/*
    This function will handle all the logic for flipping the card. You can check if a variable doesn't
    have a value attached to it or is null by doing if (variable === null) {} or if (variable == null) {} or  if (!variable){}
    If a card get's flipped, add the 'flipped' css class and also display the symbol. 
    Also, if this is the first card you picked, then set the firstCard variable to the card you just picked.
    If it's the second, then set the secondCard variable to it. Also, if that's the second card, then you 
    want to check for a match using the checkForMatch() function. 
*/
function flipCard(card) {
    // If the board is supposed to be locked or you picked the same card you already picked
    if (lockBoard || card === firstCard) return;
    if(!card) return; //TODO: i think we're supposed to do This here?
    
    //card.className += " flipped";
    card.classList.add("flipped");
    card.innerText = card.dataset.symbol;

    if(!firstCard) firstCard = card;
    else if(!secondCard) 
    {
        secondCard = card;
        checkForMatch();
    }

}

/* 
    If there's a match between the first two cards that you picked, you want to take those cards out of the
    game and then reset the board so that there is firstCard == null and secondCard == null.
    Otherwise, you should unflip the card and continue playing normally.
*/
function checkForMatch() {
    if(firstCard.dataset.symbol === secondCard.dataset.symbol)
    {
        disableCards(); //this'll call it on firstCard and secondCard
    }

    //un-flip them
    unflipCards();
}

/* 
    Disable both of the cards by adding the "matched" class to them. The "matched" class will add CSS
    properties to make sure that they can no longer be clicked at all. Then use the resetBoard() function
    to reset the firstCard, secondCard, and lockBoard variables. (That's been written for you already)
*/
function disableCards() 
{
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
}
 
/* ---------------------  Everything under has already been done for you -------------------------- */

function unflipCards() {

    // We lock the board so that the user can't touch the board while it is unflipping
    lockBoard = true;

    // The cards will be flipped back after 1 second and the board will be reset
    // The 1 second is to give the user time to actaully see the card so they can memorize them before they unflip
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initGame();