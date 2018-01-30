let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');


function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value ===''|| attempt.value=='' ){
        setHiddenFields();
    }
    if (!(validateInput(input.value))) {
        return false;
    }
    if(validateInput(input.value)) {
        attempt++;
    }
    if (getResults(input.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    }
    if (!getResults(input.value) && attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    }
    else {
        setMessage('Incorrect, try again.')
    }
}

function setHiddenFields() {
    answer.value = Math.floor(Math.random() * 9999).toString();    
    attempt.value = 0;
    while (answer.value.length < 4) {
        answer.value = '0' + answer.value;
    }
   
}

function setMessage(text) {
    let msg = document.getElementById('message');
    msg.innerHTML = text;
}

function validateInput(input) {
    if (input.length !== 4) {
        setMessage('Guesses must be exactly 4 characters long.')
        return false;
    }
    return true;
}

function getResults(input) {
    let results = document.getElementById('results');
    let div = '<div class="row"><span class="col-md-6"> ' + input + ' </span>  <div class="col-md-6">';
    for (var i = 0; i < 4; i++) {
        if (input.charAt(i) == answer.charAt(i)) {
            div += '<span class="glyphicon glyphicon-ok"></span>';
        }       
        else if (input.charAt(i) == answer.value.charAt((i + 1) % 4) || input.charAt(i) == answer.value.charAt((i + 2) % 4)
            || input.charAt(i) == answer.value.charAt((i + 3) % 4)) {
            div += '<span class="glyphicon glyphicon-transfer"></span>';
        }
        else {
            div += '<span class="glyphicon glyphicon-remove"></span>';        
        }

    }
    div += '</div></div>';
    results.innerHTML += div;    
    for (var i = 0; i < 4; i++) {
        if (input.charAt(i) != answer.value.charAt(i)) {
            return false;
        }
    }
    return true;
}

function showAnswer(hasWon) {
    let code = document.getElementById('code');
    code.innerHTML = '<strong>' + answer.value + '</strong>';
    if (hasWon === true) {
        code.className += ' success';
    }
    else {
        code.className += ' failure';
    }
}

function showReplay() {
    let guessingDiv = document.getElementById('guessing-div');
    let replayDiv = document.getElementById('replay-div');

    guessingDiv.style = 'display: none';
    replayDiv.style = 'display: block';
}