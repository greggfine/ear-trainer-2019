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
        // this.amp.gain.setValueAtTime(this.amp.gain.value, 1)
        // this.amp.gain.linearRampToValueAtTime(this.amp.gain.value, 5.05)
        this.osc.start(audioCtx.currentTime + this.offset);
    }

    stopSound(){

        // this.amp.gain.setValueAtTime(0.0001, 0.8)
        // this.amp.gain.linearRampToValueAtTime(0.0001, 0.9)
        // this.amp.gain.setValueAtTime(this.amp.gain.value, audioCtx.currentTime );
        // this.amp.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.03);
        this.osc.stop(audioCtx.currentTime + this.stopTime);
    }
}


export default Sound;