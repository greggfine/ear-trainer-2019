
var audioCtx = new AudioContext();

class Handler { 
    constructor(){
        this.range = document.querySelector('#gain-slider');
    }

}

class Sound {
    constructor(freq=1000, gainVal=0.2, oscType='sawtooth'){
        this.freq = freq;
        this.gainVal = gainVal;
        this.oscType = oscType;
        this.gainSlider = new Handler()
    }

    init(){
        this.osc = audioCtx.createOscillator();
        this.amp = audioCtx.createGain();
        this.osc.type = this.oscType;
        this.osc.connect(this.amp);
        this.amp.connect(audioCtx.destination);
        setInterval(() => {
            this.amp.gain.value = this.gainSlider.range.value;
        })
        this.playSound();
    }

    playSound(){
        this.osc.start(audioCtx.currentTime);
    }

    stopSound(){
        this.osc.stop(audioCtx.currentTime);
    }
}

export default Sound;



