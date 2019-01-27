import Sound from './Sound';
import Waveform from './Waveform';  
import FrequencySelector from './FrequencySelector';  
import RandomFreq from './RandomFrequency';
import Guesses from './Guesses';
import UserAnswer from './UserAnswer';
// import GainSlider from './GainSlider';
import Mode from './Mode';
import Reset from './Reset';
const answerDisplay = document.querySelector('#answer-display');
var chance = 0;
const chanceDisplay = document.querySelector('#chance');
const playAgain = document.querySelector('#play-again');
const guessBtns = document.querySelectorAll('.guess')
Array.from(guessBtns).forEach((btn) => {
    btn.disabled = true;
})

class GainSlider {
    constructor() {
        this.range = document.querySelector('#gain-slider');
    }
}


class Play {
    constructor(startingFreq, waveform, offset, RandomFreq, GainSlider) {
        this.playBtn = document.querySelector('#play-btn');
        this.sound = false;
        this.initialFreq = startingFreq;
        this.waveform = waveform;
        this.offset = offset;
        this.randFreq = RandomFreq;
        this.gainVal = GainSlider;
        this.events();

    }
    events() {
            this.playBtn.addEventListener('click', () => this.playSound());
    }
    playSound() {
        mode.disabled = true;

        Array.from(guessBtns).forEach((btn) => {
            btn.disabled = true;
        })
        if(chance === 3){
            chance = 0;
        }
        if(!this.sound){
        answerDisplay.textContent = '';
        var randFreq = new this.randFreq();
        var gainVal = new this.gainVal();
        var guesses = new Guesses(randFreq);
        var userAnswer = new UserAnswer(guesses.correctAnswer, gainVal, this.waveform.oscType);
        chance += 1;
        chanceDisplay.textContent = `${chance} of 3 chances`;

        this.sound = new Sound(this.initialFreq.freq, gainVal.range.value, this.waveform.oscType, this.offset, 1);
        this.sound.init();
        this.sound.stopSound()

        this.sound2 = new Sound(randFreq.freq, gainVal.range.value, this.waveform.oscType, 2, 3);
        this.sound2.init();
        this.sound2.stopSound();

        this.playBtn.textContent = 'Listen...';
        this.playBtn.classList.toggle('btn-danger');

        setTimeout(()=>{
            this.playBtn.textContent = 'Play'
            this.playBtn.classList.toggle('btn-danger');
            this.playBtn.disabled = true;
            this.sound = false;
            Array.from(guessBtns).forEach((btn) => {
                btn.disabled = false;
            })
        }, 3300)
        }
    }
}

var play1 = new Play(FrequencySelector, Waveform, 0, RandomFreq, GainSlider);
