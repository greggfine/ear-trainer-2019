import Sound from './Sound';

const mode = document.querySelector('#mode');

var correct;
var correctScoreStatus = 0;
var wrongScoreStatus = 0;
var chance = 0;
var answerOscType;
var answerGainVal;

function respondToUser(freq){
         var sound = new Sound(freq, answerGainVal.range.value, answerOscType, 0, 1);
         sound.init();
         sound.stopSound()
}

const answerDisplay = document.querySelector('#answer-display');
const correctScore = document.querySelector('#correct-score');
const wrongScore = document.querySelector('#wrong-score');
const chanceDisplay = document.querySelector('#chance');
const resultMessage = document.querySelector('#result-message');
const playBtn = document.querySelector('#play-btn');
const playAgain = document.querySelector('#play-again');

class UserAnswer {
     constructor(correctAnswer, gainVal, oscType){
        correct = correctAnswer;
        this.btnGroup = document.querySelector('#guesses');
        this.btnGroup2 = document.querySelector('#guesses2');
        this.gainVal = gainVal;
        this.oscType = oscType;
        answerOscType = oscType;
        answerGainVal = gainVal;
        this.answered();
    }
    answered(){
        this.btnGroup.addEventListener('click', this.run)
        this.btnGroup2.addEventListener('click', this.run)
    }
    run(e){
         e.target.parentElement.childNodes.forEach((child) => {
                child.disabled = true;
        })
        
         if(chance === 2 && +e.target.dataset.freq === +correct[0].dataset.freq){
                respondToUser(+e.target.dataset.freq);
                chance = 0;
                correctScore.textContent = ++correctScoreStatus;
                resultMessage.textContent = `You got ${correctScoreStatus} correct!`
                chanceDisplay.textContent = '';
                playBtn.disabled = true;
                var btn = document.createElement('button');
                btn.textContent = 'Play Again?';
                btn.classList = 'btn btn-info'
                btn.addEventListener('click', function() {
                    // CALL A 'RESET' FUNCTION HERE INSTEAD
                    playBtn.disabled = false;
                    correctScoreStatus = 0;
                    wrongScoreStatus = 0;
                    correctScore.textContent = '';
                    wrongScore.textContent = '';
                    resultMessage.textContent = '';
                    chance = 0;
                    this.parentElement.removeChild(btn)
                    setTimeout(() => {
                        playBtn.disabled = false;
                        mode.disabled = false;
                    }, 500)
                })
                playAgain.appendChild(btn)
                
                return;
            }
            else if(chance === 2 && +e.target.dataset.freq !== +correct[0].dataset.freq){
                respondToUser(+e.target.dataset.freq);
                chance = 0;
                wrongScore.textContent = ++wrongScoreStatus;
                resultMessage.textContent = `You got ${correctScoreStatus} correct!`
                chanceDisplay.textContent = '';
                playBtn.disabled = true;
                var btn = document.createElement('button');
                btn.textContent = 'Play Again?'
                btn.classList = 'btn btn-info'
                btn.addEventListener('click', function() {
                    playBtn.disabled = false;
                    correctScoreStatus = 0;
                    wrongScoreStatus = 0;
                    correctScore.textContent = '';
                    wrongScore.textContent = '';
                    resultMessage.textContent = '';
                    chance = 0;
                    this.parentElement.removeChild(btn)
                    setTimeout(() => {
                        playBtn.disabled = false;
                        mode.disabled = false;
                    }, 500)

                })
                playAgain.appendChild(btn)
                return;
            }
         else if (+e.target.dataset.freq === +correct[0].dataset.freq){
            respondToUser(+e.target.dataset.freq);
            chance += 1;
             correctScore.textContent = ++correctScoreStatus;
             setTimeout(() => {
                playBtn.disabled = false;
             }, 500)

         } else {
             respondToUser(+e.target.dataset.freq);
             wrongScore.textContent = ++wrongScoreStatus;
             chance += 1;
             setTimeout(() => {
                playBtn.disabled = false;
             }, 500)
         }
     }
   
}

export default UserAnswer;

