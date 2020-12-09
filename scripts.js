const pomodoroBtn = document.querySelector('.option--1');
const shortBreakBtn = document.querySelector('.option--2');
const longBreakBtn = document.querySelector('.option--3');
const options = Array.from(document.querySelectorAll('.option'));
const actions = Array.from(document.querySelectorAll('.action'));

const timeDOM = document.querySelector('.timer');

const startBtn = document.querySelector('.action--start');
const pauseBtn  = document.querySelector('.action--pause');
const resetBtn  = document.querySelector('.action--reset');

let time, timerDown, current;
time = 25 * 60;
current = 'pomodoro';

const newActiveClass = function(arr, active){
    const activeClass = arr === options ?  'option--active' : 'action--active';
    arr.forEach(el => el.classList.remove(activeClass));
    if(active !== resetBtn)
    active.classList.add(activeClass);
}

const startCountDown = function(){
    
    const countDown = function(){
        time--;
        const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
        const sec = `${time % 60}`.padStart(2, 0);
        timeDOM.textContent = `${min}:${sec}`;

        if(time === 0){
            clearInterval(timerDown);
            timeDOM.textContent = '00:00';
            let audio = new Audio('audio.mp3');
            audio.play();
        }
    };
    
    timerDown = setInterval(countDown, 1000);
    countDown();
    return timerDown;
}

const resetCountDown = function(){
    if(timerDown) clearInterval(timerDown);
    if (current === 'pomodoro') timeDOM.textContent = `25:00`;
    if (current === 'short') timeDOM.textContent = `05:00`;
    if (current === 'long') timeDOM.textContent = `15:00`;
}


startBtn.addEventListener('click', function(){
    newActiveClass(actions, startBtn);
    startCountDown();
});

pauseBtn.addEventListener('click', function(){
    newActiveClass(actions, pauseBtn);
    if(timerDown) clearInterval(timerDown);
});

resetBtn.addEventListener('click', function(){
    resetCountDown();
    newActiveClass(actions, resetBtn);
});

pomodoroBtn.addEventListener('click', function(){
    current = 'pomodoro';
    resetCountDown();
    time = 25 * 60;
    newActiveClass(options, pomodoroBtn);
});

shortBreakBtn.addEventListener('click', function(){
    current = 'short';
    resetCountDown();
    time = 5 * 60;
    newActiveClass(options, shortBreakBtn);
});

longBreakBtn.addEventListener('click', function(){
    current = 'long';
    resetCountDown();
    time = 15 * 60;
    newActiveClass(options, longBreakBtn);
});



