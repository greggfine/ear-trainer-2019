import RandomFrequency from './RandomFrequency';

class Guesses {
    constructor(randFreq){
        this.guessBtns = document.querySelectorAll('.guess');
        this.randFreq = randFreq;
        const guessBtnArr = Array.from(this.guessBtns);
        const correctAnswer = guessBtnArr.filter((guessBtn) => {
            return Number(guessBtn.dataset.freq) === this.randFreq.freq;
        })
        this.correctAnswer = correctAnswer;
    }
}

export default Guesses;