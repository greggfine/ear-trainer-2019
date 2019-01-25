import GainSlider from './GainSlider';

const gainVal = new GainSlider();

const btnGroup = document.querySelector('#btn-group');
const reset = document.querySelector('#reset');
const mode = document.querySelector('#mode');
const visibleEasy = document.querySelector('.visible-easy');
const visibleHard = document.querySelector('.visible-hard');
const startingFreqSelector = document.querySelector('#starting-freq-selector');



reset.addEventListener('click', () => {
    gainVal.range.value = 0.5;
    mode.value = 'easy';
    visibleEasy.classList.add('easy');
    visibleHard.classList.remove('hard');
    startingFreqSelector[0].selected = true;
})



console.log(gainVal);
