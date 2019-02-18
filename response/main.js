const box = document.querySelector('#box');
const timeout = document.querySelector('#timeout');

document.body.addEventListener('click',(evt) => {
    evt.preventDefault();
    box.classList.remove('altered');
});

let pending = false;
box.addEventListener('click', async(evt) => {
    evt.preventDefault();

    if (pending) return;

    const duration = Number(timeout.value);

    // start tracking
    performance.mark('start');

    // be pessimistic
    const id = setTimeout(() => {
        showSpinner();
    }, 100);

    // start the work
    await doSomeWork(duration);

    // doSomeWork finished first? Clear timeout
    clearTimeout(id);

    // doSomeWork finished second? Hide the spinner
    hideSpinner();

    // change the box color.
    box.classList.add('altered');

    // Measure th time taken
    performance.mark('end');
    performance.measure('box', 'start', 'end');

    // Reset  for next line
    pending = false;
});

function doSomeWork(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

function showSpinner() {
    box.classList.add('spinner');
}

function hideSpinner() {
    box.classList.remove('spinner');
}
