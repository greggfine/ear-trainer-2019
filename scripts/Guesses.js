import RandomFrequency from './RandomFrequency';

class Guesses {
    constructor(){
        this.guesses = document.querySelector('#guesses');
        this.events();
    }
    events(){
        var li = document.createElement('li');
        li.textContent = 'yo'
        li.className = 'list-group-item'
        this.guesses.appendChild(li)
    }

}

export default new Guesses();