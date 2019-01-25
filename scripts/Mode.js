const mode = document.querySelector('#mode');
const visibleEasy = document.querySelector('.visible-easy');
const visibleHard = document.querySelector('.visible-hard');
visibleEasy.classList.add('easy')
mode.addEventListener('change', (e) => {
    if (e.target.value === 'easy') {
        mode.disabled = true;
        visibleEasy.classList.toggle('easy')
        visibleHard.classList.toggle('hard')

    } else {
        mode.disabled = true;
        visibleEasy.classList.toggle('easy')
        visibleHard.classList.toggle('hard')

    }
})


export default mode;