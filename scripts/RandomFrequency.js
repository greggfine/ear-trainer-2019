import frequencyArr from '../FrequencyMap';

class RandomFrequency {
    constructor(){
        this.freq = frequencyArr[Math.floor(Math.random() * frequencyArr.length) ]
    }
}


export default RandomFrequency;