import Sound from './Sound';
import Waveform from './Waveform';  
import FrequencySelector from './FrequencySelector';  
import RandomFreq from './RandomFrequency';
import Guesses from './Guesses';



class Play {
    constructor(startingFreq, waveform, offset, RandomFreq) {
        this.playBtn = document.querySelector('#play-btn');
        this.events();
        this.sound = false;
        this.initialFreq = startingFreq;
        this.waveform = waveform;
        this.offset = offset;
        this.randFreq = RandomFreq;
    }
    events() {
        this.playBtn.addEventListener('click', () => this.playSound());
    }
    playSound() {
        if(!this.sound){

        var randFreq = new this.randFreq();
   
        this.sound = new Sound(this.initialFreq.freq, 0.5, this.waveform.oscType, this.offset, 1);
        this.sound.init();
        this.sound.stopSound()

        this.sound2 = new Sound(randFreq.freq, 0.5, this.waveform.oscType, 2, 3);
        this.sound2.init();
        this.sound2.stopSound();

        this.sound = false;
        
        this.playBtn.textContent = 'Listen';
        this.playBtn.classList.toggle('btn-danger');
        }
    }
}

// 

var play1 = new Play(FrequencySelector, Waveform, 0, RandomFreq);

