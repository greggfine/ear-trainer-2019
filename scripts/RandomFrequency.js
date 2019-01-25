// import frequencyArr from '../FrequencyMap';

// class RandomFrequency {
//     constructor(){
//         this.freq = frequencyArr[Math.floor(Math.random() * frequencyArr.length) ]
//     }
// }

// export default RandomFrequency;


// ========================================

import FrequencyMap from '../FrequencyMap';

const mode = document.querySelector('#mode');


class RandomFrequency {
    constructor(){
        if(mode.value === 'easy'){
            this.freq = FrequencyMap.frequencyArrEasy[Math.floor(Math.random() * FrequencyMap.frequencyArrEasy.length) ]
        } else {
            this.freq = FrequencyMap.frequencyArrHard[Math.floor(Math.random() * FrequencyMap.frequencyArrHard.length) ]

        }
    }
}

export default RandomFrequency;