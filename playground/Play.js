var audioCtx = new AudioContext();

class Waveform {
    constructor(){
        this.btnGroup = document.querySelector('#btn-group');
        this.events();
    }
    events(){
        this.btnGroup.addEventListener('click', (e) => this.selectWaveform(e.target.id));
    }
    selectWaveform(waveformId){
        this.oscType = waveformId;
    }
}
var waveform = new Waveform();



class Sound {
    constructor(freq=440.0, gainVal=0.2, oscType='sine', offset=0){
        this.freq = freq;
        this.gainVal = gainVal;
        this.oscType = oscType;
        this.offset = offset;
    }

    init(){
        this.osc = audioCtx.createOscillator();
        this.amp = audioCtx.createGain();
        this.osc.type = this.oscType;
        this.osc.frequency.value = this.freq;
        this.osc.connect(this.amp);
        this.amp.connect(audioCtx.destination);
        this.playSound();
    }

    playSound(){
        this.osc.start(audioCtx.currentTime + this.offset);
    }

    stopSound(){
        this.osc.stop(audioCtx.currentTime);
        clearInterval(this.timer)
    }
}

class Play {
    constructor(oscInput, offset) {
        this.playBtn = document.querySelector('#play-btn');
        this.events();
        this.sound = false;
        this.osc = oscInput;
        this.offset = offset;
    }
    events() {
        this.playBtn.addEventListener('click', () => this.playSound(this.osc, this.offset));
    }
    playSound() {
        if(!this.sound){
            console.log(this.osc.oscType)
            this.sound = new Sound(400, 0.5, this.osc.oscType, this.offset);
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

new Play(waveform, 0);
// new Play(0);
