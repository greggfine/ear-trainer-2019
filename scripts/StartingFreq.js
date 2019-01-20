class StartingFreq {
    constructor(){
        this.startingFreqSelector = document.querySelector('#starting-freq-selector');
        this.events();
    }
    events(){
        this.startingFreqSelector.addEventListener('change', (e) => this.setStartingFreq(e.target.value))
    }
    setStartingFreq(startingFreqVal){
        this.startingFreq = startingFreqVal;
    }
}

export default new StartingFreq();