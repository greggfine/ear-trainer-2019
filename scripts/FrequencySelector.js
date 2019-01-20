class FrequencySelector {
    constructor(){
        this.startingFreqSelector = document.querySelector('#starting-freq-selector');
        this.events();
    }
    events(){
        this.startingFreqSelector.addEventListener('change', (e) => this.setStartingFreq(e.target.value))
    }
    setStartingFreq(startingFreqVal){
        this.freq = startingFreqVal;
    }
}

export default new FrequencySelector();