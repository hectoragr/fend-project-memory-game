/*
 * Create a list that holds all of your cards
 */
 const scoreMoves = document.querySelector('.moves');
 let elapsedSeconds = 0;
 let openCards = [];
 let scoreBoardList = [];
 let choosenCard;
 let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
// Modified to shuffle className
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex].className;
        array[currentIndex].className = array[randomIndex].className;
        array[randomIndex].className = temporaryValue;
    }

    return array;
}

function addSecond() {
	elapsedSeconds += 1;
}

/*
** void: get UL of Score Board, empty it and fill it with sorted top scores
*/ 
function drawScoreBoard() {
	const scoreBoard = document.querySelector('.score-board');
	scoreBoard.innerHTML = "";
	scoreBoardList.forEach(function(el) {
		const li = document.createElement("LI");
		li.appendChild(document.createTextNode(el + " moves"));
		scoreBoard.appendChild(li);
	});
}

/*
** void: if moves doesn't exist in Top Scores, add it.
**       Alert user of how many moves and seconds it took to complete. 
**		 Ask if they wanna Try again, or just cancel to see all open deck
*/
function winGame() {
	if (!scoreBoardList.includes(moves)) {
		scoreBoardList.push(moves);
		scoreBoardList.sort();
		drawScoreBoard();
	}
	if (window.confirm("You have won the game in " + moves + " moves and " + elapsedSeconds + " seconds!\nDo you want to Play Again?")) { 
		resetGame();
	}
}

/*
** void: Reset game to initial state, minus scoreboard.
*/
function resetGame() {
	moves = 0;
	elapsedSeconds = 0;
	scoreMoves.innerText = moves;
	openCards = [];
	Array.from(document.querySelectorAll('.stars li .fa-star-o')).forEach(function(el) {
		el.classList.toggle('fa-star-o');
		el.classList.toggle('fa-star');
	});
	Array.from(document.querySelectorAll('.card')).forEach(function(el) {
		el.className = 'card';
	});
	Array.from(document.getElementsByClassName('card')).forEach(function(el) {
		el.addEventListener('click', showCard);
	});
	shuffleIcons();
}

/*
** void: Remove one star from Score
*/
function removeLife() {
	const lifeStar = document.querySelectorAll('.stars li .fa-star');
	const star = lifeStar[lifeStar.length - 1];
	if (star) {
		star.classList.toggle('fa-star');
		star.classList.toggle('fa-star-o');
	}
}

/*
** void: toggle given card open/closed
*/
function toggleOpen(el) {
	el.classList.toggle("open");
	el.classList.toggle("show");
}

/*
** void: toggle given card to match and lock it
*/
function openMatch(el) {
	el.classList.toggle("match");
	el.removeEventListener('click', showCard);
}

/*
** boolean: if all cards are matched
*/
function allMatchesFound() {
	return document.querySelectorAll('.card.match').length == 16;
}

/*
** void: if there are two cards open, compare to match
*/
function checkOpenCards() {
	if (openCards.length > 1) {
		if (openCards[0].firstElementChild.classList.value == openCards[1].firstElementChild.classList.value) {
			openMatch(openCards[0]);
			openMatch(openCards[1]);
			openCards = [];
			if (allMatchesFound()) {
				setTimeout(winGame, 500);
			}
		} else {
			toggleOpen(openCards[0]);
			toggleOpen(openCards[1]);
			openCards = [];
		}
	}
}

/*
** void: If card is not open, flip it. Increase move counter. Check if there is a matching card open.
*/
const showCard = function () {
	if (!this.classList.contains("open")) {
		toggleOpen(this);
		openCards.push(this);
		moves += 1;
		scoreMoves.innerText = moves;
	}
	setTimeout(checkOpenCards, 500);
};

/*
** void: shuffle i elements classes to move icons around
*/
function shuffleIcons() {
	const arrCards = document.querySelectorAll('.card .fa');
	const shuffledCards = shuffle(Array.from(arrCards));
	let index = 0;
	for (let card of arrCards) {
		card.className = shuffledCards[index].className;
		index += 1;
	}
}

/*
** void: Wait until DOM is fully loaded to add event listeners and start game clean.
*/
document.addEventListener("DOMContentLoaded", function (event) {
	setInterval(addSecond, 1000);
	setInterval(removeLife, 30000);
	resetGame();
	drawScoreBoard();
	document.querySelector('.restart').addEventListener('click', resetGame);
	document.querySelector('.stars').addEventListener('click', function() {
		alert("Each 30 seconds you get one less star");
	});
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
