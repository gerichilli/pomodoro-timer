const pomodoroBtn = document.querySelector('.option--1');
const shortBreakBtn = document.querySelector('.option--2');
const longBreakBtn = document.querySelector('.option--3');
const options = Array.from(document.querySelectorAll('.option'));
const actions = Array.from(document.querySelectorAll('.action'));

const timeDOM = document.querySelector('.timer');

const startBtn = document.querySelector('.action--start');
const pauseBtn  = document.querySelector('.action--pause');
const resetBtn  = document.querySelector('.action--reset');

let timerDown, clickable, activeClass;
let audio = new Audio('audio.mp3');
let time = 25 * 60;
let current = 'pomodoro';

const removeClass = function(arr) {
    activeClass = arr === options ?  'option--active' : 'action--active';
    arr.forEach(el => el.classList.remove(activeClass));
    return activeClass;
};

const newActiveClass = function(arr, active){
    removeClass(arr);
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
            audio.play();
            checkTime();
        }
    };
    
    timerDown = setInterval(countDown, 1000);
    countDown();
    return timerDown;
}

const checkTime = function() {
    if (current === 'pomodoro') {
        time = 25 * 60;
    }
    if (current === 'short') {
        time = 5 * 60;
    }
    if (current === 'long') {
        time = 15 * 60;
    }
}

const resetCountDown = function(){
    clickable = true;
    audio.pause();
    if(timerDown) clearInterval(timerDown); 
    checkTime();
    if (current === 'pomodoro') {
        timeDOM.textContent = '25:00';
    }
    if (current === 'short') {
        timeDOM.textContent = '05:00';
    }
    if (current === 'long') {
        timeDOM.textContent = '15:00';
    }
}

clickable = true;
startBtn.addEventListener('click', function(){
    if (clickable){
        audio.pause();
        newActiveClass(actions, startBtn);
        startCountDown();
    }
    clickable = false;
});

pauseBtn.addEventListener('click', function(){
    clickable = true;
    audio.pause();
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
    newActiveClass(options, pomodoroBtn);
    removeClass(actions);
});

shortBreakBtn.addEventListener('click', function(){
    current = 'short';
    resetCountDown();
    newActiveClass(options, shortBreakBtn);
    removeClass(actions);
});

longBreakBtn.addEventListener('click', function(){
    current = 'long';
    resetCountDown();
    newActiveClass(options, longBreakBtn);
    removeClass(actions);
});



