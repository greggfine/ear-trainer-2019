import Sound from './Sound';
import Waveform from './Waveform';  

class Play {
    constructor() {
        this.playBtn = document.querySelector('#play-btn');
        this.events();
    }
    events() {
        this.playBtn.addEventListener('click', this.playSound)
    }
    playSound() {
        console.log(Waveform)
        var sound = new Sound(2000, 0.5, Waveform.oscType);
        sound.init();
    }
}

export default Play;