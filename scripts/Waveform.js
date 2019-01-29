class Waveform {
    constructor(){
        this.btnGroup = document.querySelector('#btn-group');
        this.events();
    }
    events(){
        this.btnGroup.addEventListener('change', (e) => this.selectWaveform(e.target.value));
        // this.btnGroup.addEventListener('click', (e) => this.selectWaveform(e.target.id));
    }
    selectWaveform(waveformId){
        this.oscType = waveformId;
    }
}

export default new Waveform();  

