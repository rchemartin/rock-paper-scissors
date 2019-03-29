function View () {
    this.playerScoreContainer = document.querySelector('#user-score');
    this.iaScoreContainer = document.querySelector('#ia-score');
    this.playerScore = 0;
    this.iaScore = 0;
    this.playerIcon = document.querySelector('#player-icon');
    this.iaIcon = document.querySelector('#ia-icon');
    this.resultTitle = document.querySelector('#result-title');
    
    this.updateDiplay = function (result, playerChoice, iaChoice) {
        console.log(result);
        switch (result) {
            case 1:
                this.playerScore ++;
                this.displayResult('win');
                break;
            case 0:
                this.displayResult('draw');
                break;
            case -1:
                this.iaScore ++;
                this.displayResult('loose');
                break;
            default:
                break;
        }
        this.updateScore();
        this.updateIcons(playerChoice, iaChoice);
    }

    this.updateScore = function () {
        this.playerScoreContainer.textContent = this.playerScore;
        this.iaScoreContainer.textContent = this.iaScore;
    }

    this.updateIcons = function (playerChoice, iaChoice) {
        this.playerIcon.src = `images/${playerChoice}.png`;
        this.iaIcon.src = `images/${iaChoice}.png`;
    }

    this.displayResult = function (resultType) {
        let winColor = '#20bf6b';
        let looseColor = '#fc5c65';
        let drawColor = '#2d98da';
        switch (resultType) {
            case 'win':
                this.resultTitle.textContent = "You won ! 👑"
                this.resultTitle.style.color = winColor;
                this.playerIcon.style.borderColor = winColor;
                this.iaIcon.style.borderColor = looseColor;
                break;
            case 'draw':
                this.resultTitle.textContent = "Draw.. Try again ! 🤷🏻‍♂️"
                this.resultTitle.style.color = drawColor;
                this.playerIcon.style.borderColor = drawColor;
                this.iaIcon.style.borderColor = drawColor;
                break;
            case 'loose':
                this.resultTitle.textContent = "You lost... 😭"
                this.resultTitle.style.color = looseColor;
                this.playerIcon.style.borderColor = looseColor;
                this.iaIcon.style.borderColor = winColor;
                break;
            default:
                break;
        }
    }
}

function Model () {
    this.choices = ['r', 'p', 's'];
    this.view = null;
    this.buttons = document.querySelectorAll('.choice');

    this.initialize = function (view) {
        let self = this;
        this.view = view;

        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener('click', function(elem) {
                self.choose(elem)
            });
        }
    }

    this.choose = function (elem) {
        let choice = elem.target.parentNode.dataset.choice;

        this.triggerGame(choice);
    }

    this.triggerGame = function (playerChoice) {
        let iaChoice = this.generateIAChoice();

        let result = this.compareChoices(playerChoice, iaChoice);

        this.setResult(result, playerChoice, iaChoice);
    }

    this.generateIAChoice = function (){
        return this.choices[Math.floor(Math.random() * Math.floor(3))];
    }

    this.compareChoices = function (playerChoice, iaChoice) {
        let result;
        switch (playerChoice + iaChoice) {
            case 'pr':
            case 'sp':
            case 'rs':
                result = 1;
                break;
            case 'rr':
            case 'pp':
            case 'ss':
                result = 0;
                break;
            case 'ps':
            case 'rp':
            case 'sr':
                result = -1;
                break;
            default:
                result = -2;
                break;
        }

        return result;
    }

    this.setResult = function(result, playerChoice, iaChoice) {
        this.view.updateDiplay(result, playerChoice, iaChoice);
    }
}

function Game () {
    this.model = null;
    this.view = null

    this.play = function () {
        this.create();
    }

    this.create = function () {
        this.view = new View();
        this.model = new Model();

        this.model.initialize(this.view);
    }
}

let game = new Game();
game.play();
