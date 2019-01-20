import Sound from './Sound';
import Waveform from './Waveform';  
import StartingFreq from './StartingFreq';  

class Play {
    constructor(offset) {
        this.playBtn = document.querySelector('#play-btn');
        this.events();
        this.sound = false;
        this.offset = offset;
    }
    events() {
        this.playBtn.addEventListener('click', () => this.playSound(this.offset));
    }
    playSound() {
        if(!this.sound){
            this.sound = new Sound(StartingFreq.startingFreq, 0.5, Waveform.oscType, this.offset);
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

export default Play;