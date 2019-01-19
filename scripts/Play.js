import Sound from './Sound';
import Waveform from './Waveform';  

class Play {
    constructor() {
        this.playBtn = document.querySelector('#play-btn');
        this.events();
        this.sound = false;
    }
    events() {
        this.playBtn.addEventListener('click', this.playSound);
    }
    playSound() {
        if(!this.sound){
            this.sound = new Sound(2000, 0.5, Waveform.oscType);
            this.sound.init();
            this.textContent = 'Stop';
        } else {
            this.sound.stopSound();
            this.sound = false;
            this.textContent = 'Play';
        }
    }
}

export default Play;