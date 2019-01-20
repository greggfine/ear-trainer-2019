import Sound from './Sound';
import Waveform from './Waveform';  
import FrequencySelector from './FrequencySelector';  

class Play {
    constructor(startingFreq, waveform, offset) {
        this.playBtn = document.querySelector('#play-btn');
        this.events();
        this.sound = false;
        this.initialFreq = startingFreq;
        this.waveform = waveform;
        this.offset = offset;
    }
    events() {
        this.playBtn.addEventListener('click', () => this.playSound());
    }
    playSound() {
        if(!this.sound){
            this.sound = new Sound(this.initialFreq.freq, 0.5, this.waveform.oscType, this.offset);
            this.sound.init();
            this.playBtn.textContent = 'Stop';
            this.playBtn.classList.toggle('btn-danger');
        } else {
            this.sound.stopSound();
            this.sound = false;
            this.playBtn.textContent = 'Play';
            this.playBtn.classList.toggle('btn-danger');
        }
    }
}

new Play(FrequencySelector, Waveform, 0);
// new Play('sawtooth', 2);
