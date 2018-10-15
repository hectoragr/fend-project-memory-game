/*
 * Create a list that holds all of your cards
 */
 const scoreMoves = document.querySelector('.moves');
 let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

function loseGame() {
	console.log("You lost");
	Array.from(document.getElementsByClassName('card')).forEach(function(el) {
		el.removeEventListener('click', toggleShow);
	});
}

function resetGame() {
	moves = 0;
	scoreMoves.innerText = moves;
	Array.from(document.querySelectorAll('.stars li .fa-star-o')).forEach(function(el) {
		el.classList.toggle('fa-star-o');
		el.classList.toggle('fa-star');
	});
	Array.from(document.querySelectorAll('.card')).forEach(function(el) {
		el.className = 'card';
	});
	Array.from(document.getElementsByClassName('card')).forEach(function(el) {
		el.addEventListener('click', toggleShow);
	});
	shuffleIcons();
}

function removeLife() {
	const lifeStar = document.querySelectorAll('.stars li .fa-star');
	const star = lifeStar[lifeStar.length - 1];
	if (star) {
		star.classList.toggle('fa-star');
		star.classList.toggle('fa-star-o');
	}else {
		loseGame();
	}
}

const toggleShow = function () {
	if (!this.classList.contains("match")) {
		moves += 1;
		scoreMoves.innerText = moves;
		removeLife();
		this.classList.toggle("open");
		this.classList.toggle("show");
	}
};

function shuffleIcons() {
	const arrCards = document.querySelectorAll('.card .fa');
	const shuffledCards = shuffle(Array.from(arrCards));
	let index = 0;
	for (let card of arrCards) {
		card.className = shuffledCards[index].className;
		index += 1;
	}
}

document.addEventListener("DOMContentLoaded", function (event) {
	resetGame();
	document.querySelector('.restart').addEventListener('click', resetGame);
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
