var audioCtx = new AudioContext();

class Sound {
    constructor(freq = 261.63, gainVal=0.2, oscType='sine', offset=0, stopTime){
        this.freq = freq;
        this.gainVal = gainVal;
        this.oscType = oscType;
        this.offset = offset;
        this.stopTime = stopTime;
    }

    init(){
        this.osc = audioCtx.createOscillator();
        this.amp = audioCtx.createGain();
        this.osc.type = this.oscType;
        this.osc.frequency.value = this.freq;
        this.amp.gain.value = this.gainVal;
        this.osc.connect(this.amp);
        this.amp.connect(audioCtx.destination);
        this.playSound();
    }

    playSound(){
        this.amp.gain.setValueAtTime(this.amp.gain.value, 0)
        this.osc.start(audioCtx.currentTime + this.offset);
    }

    stopSound(){
        this.amp.gain.linearRampToValueAtTime(0.0211, audioCtx.currentTime + this.stopTime)
        this.osc.stop(audioCtx.currentTime + this.stopTime);
    }
}


export default Sound;