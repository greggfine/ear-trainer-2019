var audioCtx = new AudioContext();

class GainSlider { 
    constructor(){
        this.range = document.querySelector('#gain-slider');
    }
}

class Sound {
    constructor(freq=1000, gainVal=0.2, oscType='sine'){
        this.freq = freq;
        this.gainVal = gainVal;
        this.oscType = oscType;
        this.gainSlider = new GainSlider();
    }

    init(){
        this.osc = audioCtx.createOscillator();
        this.amp = audioCtx.createGain();
        this.osc.type = this.oscType;
        this.osc.connect(this.amp);
        this.amp.connect(audioCtx.destination);
        this.timer = setInterval(() => {
            this.amp.gain.value = this.gainSlider.range.value;
        })
        this.playSound();
    }

    playSound(){
        this.osc.start(audioCtx.currentTime);
    }

    stopSound(){
        this.osc.stop(audioCtx.currentTime);
        clearInterval(this.timer)
    }
}

export default Sound;