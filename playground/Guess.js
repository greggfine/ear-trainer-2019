var freqs = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25]
var rand = freqs[Math.floor(Math.random() * freqs.length)];
var currentAnswer;

const guesses = document.querySelectorAll('.guess');
guesses.forEach((guess) => {
    guess.addEventListener('click', function() {
        if(rand === +this.dataset.freq){
               currentAnswer = guess
        }
        console.log(currentAnswer)
    })
})

