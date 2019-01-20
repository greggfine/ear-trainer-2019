var audioCtx = new AudioContext();

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

export default Sound;