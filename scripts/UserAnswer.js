var correct;
var correctScoreStatus = 0;
var wrongScoreStatus = 0;
var chance = 0;

const answerDisplay = document.querySelector('#answer-display');
const correctScore = document.querySelector('#correct-score');
const wrongScore = document.querySelector('#wrong-score');
const chanceDisplay = document.querySelector('#chance');
const resultMessage = document.querySelector('#result-message');
const playBtn = document.querySelector('#play-btn');
const playAgain = document.querySelector('#play-again');



class UserAnswer {
     constructor(correctAnswer){
        correct = correctAnswer;
        this.btnGroup = document.querySelector('#guesses');
        // this.btnGroup.removeEventListener('click', this.run);
        this.answered();
     }
     answered(){
        this.btnGroup.addEventListener('click', this.run)
     }
     run(e){
         e.target.parentElement.childNodes.forEach((child) => {
                child.disabled = true;
        })
         if(chance === 2 && +e.target.dataset.freq === +correct[0].dataset.freq){
                chance = 0;
                correctScore.textContent = ++correctScoreStatus;
                resultMessage.textContent = `You got ${correctScoreStatus} correct!`
                chanceDisplay.textContent = '';
                playBtn.disabled = true;
                var btn = document.createElement('button');
                btn.textContent = 'Play Again?'
                btn.addEventListener('click', function() {
                    playBtn.disabled = false;
                    correctScoreStatus = 0;
                    wrongScoreStatus = 0;
                    correctScore.textContent = '';
                    wrongScore.textContent = '';
                    resultMessage.textContent = '';
                    chance = 0;
                    this.parentNode.removeChild(btn)
                })
                playAgain.appendChild(btn)
                
                return;
            }
            else if(chance === 2 && +e.target.dataset.freq !== +correct[0].dataset.freq){
                chance = 0;
                wrongScore.textContent = ++wrongScoreStatus;
                resultMessage.textContent = `You got ${correctScoreStatus} correct!`
                chanceDisplay.textContent = '';
                playBtn.disabled = true;
                var btn = document.createElement('button');
                btn.textContent = 'Play Again?'
                btn.addEventListener('click', () => {
                    playBtn.disabled = false;
                    correctScoreStatus = 0;
                    wrongScoreStatus = 0;
                    correctScore.textContent = '';
                    wrongScore.textContent = '';
                    resultMessage.textContent = '';
                    chance = 0;
                    this.parentNode.removeChild(btn)

                })
                playAgain.appendChild(btn)
                return;
            }
         else if (+e.target.dataset.freq === +correct[0].dataset.freq){
            chance += 1;
             correctScore.textContent = ++correctScoreStatus;

         } else {
             wrongScore.textContent = ++wrongScoreStatus;
             chance += 1;
         }
     }
}

export default UserAnswer;

