function shuffleDeck() {
    globalThis.card = new Array(4);
    for (var i = 0; i < card.length; i++) {
        card[i] = Array.from({length: 14}, (v, i) => i); // i(index) 1씩 증가
        card[i][0] = 'A'
        card[i][11] = 10
        card[i][12] = 10
        card[i][13] = 10

    }
    
    return card
}

function choiceDeck() {
    return Math.floor(Math.random() * (4)); 
}

function choiceCard() {
    return Math.floor(Math.random() * (14));
}

function play(number) {
    const dealerHand = [];
    let isHeGotA = 0;
    while (true) {
        const whichDeck = choiceDeck();
        const whichCard = choiceCard();
        choicedCard = card[whichDeck][whichCard]

        if (choicedCard !== 0) {
            if (choicedCard === 'A') {
                choicedCard = 11
                isHeGotA += 1
            }
            dealerHand.push(choicedCard)
            card[whichDeck][whichCard] = 0
        } else {
            continue
        }
        let totalHand = 0
        for (let i=0; i<dealerHand.length; i++) {
            totalHand = totalHand + dealerHand[i]
        }
        if (isHeGotA && totalHand > 21) {
            totalHand -= isHeGotA * 10;
        }

        if (totalHand >= number) {
            return totalHand
        }
    }
}

function dealer(number) {
    return play(number)
}

function player(number) {
    return play(number)
}

function playGame() {
    playerScore = player(12);
    dealerScore = dealer(17);
    if (playerScore > 21) {
        return false
    } else if (dealerScore > 21) {
        return true
    } else if (playerScore === dealerScore){
        return null
    } else {
        return playerScore > dealerScore
    }
}

let win = 0
let lose = 0
let draw = 0
const numberOfMatches = 10000
for (let i=0; i<numberOfMatches; i++) {
    shuffleDeck();
    result = playGame()
    if (result === null) {
        draw += 1
        continue
    }
    if (result) {
        win += 1
    } else {
        lose += 1
    }
}
console.log(`win: ${win}`);
console.log(`lose: ${lose}`);
console.log(`draw: ${draw}`);
console.log(`win rate is ${(win / numberOfMatches * 100).toFixed(1)}`);