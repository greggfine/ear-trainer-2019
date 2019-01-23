var crct;
const answerDisplay = document.querySelector('#answer-display');


class UserAnswer {
     constructor(correctAnswer){
        crct = correctAnswer;
        this.btnGroup = document.querySelector('#guesses');
        // this.btnGroup.removeEventListener('click', this.run);
        this.answered();
     }
     answered(){
        this.btnGroup.addEventListener('click', this.run)
     }
     run(e){
         if (+e.target.dataset.freq === +crct[0].dataset.freq){
             answerDisplay.textContent = 'correct!'

         } else {
             answerDisplay.textContent = 'wrong!'
         }
     }
}

export default UserAnswer;

