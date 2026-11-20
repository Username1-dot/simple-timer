const timerElement = document.getElementById("timer");
let timer3010Element = document.getElementById("3010");
let timer2510Element = document.getElementById("2510");
const timerName = document.getElementById("timerName");
const date = new Date();
const timerAudio = new Audio("assets/timer-beep.mp3");
timerAudio.volume = 0.5
const wordClock = document.getElementById("wordClock");
let timerPaused = true;
let timerReset = false;
let beeps = 0;
let currentTimer = [0, 0, 0];
let timerIndex = 0;

const timerArray3010 = [
    ["Study Timer", [0, 30, 0]],
    ["Break Timer", [0, 10, 0]]
];

const timerArray2510 = [
    ["Study Timer", [0, 25, 0]],
    ["Break Timer", [0, 10, 0]]
];
const testArray0301 = [
    ["Test 1", [0, 0, 3]],
    ["Test 1", [0, 0, 1]]
];

function getNextTimer() {
    if (currentTimer <= [0, 0, 0]) {
        if (timerIndex == 1) {
            timerIndex = 0;
        }
        else {
            timerIndex = 1;
        }
    }
}

function checkUsedTimer() {
    if (timer3010Element.checked) {
        currentTimer = [...timerArray3010[timerIndex][1]];
    }
    else {
        currentTimer = [...timerArray2510[timerIndex][1]];
    }
    return currentTimer;
}

function setTimerName() {
    if (timerIndex == 0) {
        timerName.innerText = "Study Timer";
    }
    else {
        timerName.innerText = "Break Timer";
    }
}

function displayTimer(time) {
    let timeString = ["", "", ""];
    for (let i = 0; i < time.length; i++) {
        if (time[i] < 10) {
            timeString[i] = "0" + time[i];
        }
        else {
            timeString[i] = time[i];
        }
    }
    timerElement.innerText = `${timeString[0]}:${timeString[1]}:${timeString[2]}`;
}

function displayWordClock() {
    const date = new Date()
    let time = [date.getHours(), date.getMinutes(), date.getSeconds()];

    let timeString = ["", "", ""];
    for (let i = 0; i < time.length; i++) {
        if (time[i] < 10) {
            timeString[i] = "0" + time[i];
        }
        else {
            timeString[i] = time[i];
        }
    }
    wordClock.innerText = `${timeString[0]}:${timeString[1]}:${timeString[2]}`;
}


function calculateNewTime(time) {
    if (time[2] === 0) {
        time[2] = 59;
        if(time[1] === 0) {
            time[1] = 59;
            time[0]--;
        }
        else {
            time[1]--;
        }
    }
    else {
        time[2]--;
    }
    return time;
}

function startPressed() {
    timerPaused = false;
}

function stopPressed() {
    timerPaused = true;
}

function resetPressed() {
    beeps = 0;
    currentTimer = checkUsedTimer();
    displayTimer(currentTimer);
    timerReset = true;
}

let time_ms = 0;

displayTimer(checkUsedTimer())

setInterval(() => {
    time_ms += 100;
    displayWordClock();
    setTimerName();
    if(!timerPaused && time_ms >= 1000) {
        if (currentTimer > [0, 0, 0]) {
            let time = calculateNewTime(currentTimer);
            displayTimer(time);
            time_ms = 0;
        }
        else {
            
            if (beeps < 1) {
                if (timerIndex + 1 < checkUsedTimer().length) {
                    timerAudio.play();
                    getNextTimer();
                }
            }
        }
        
    }
}, 100)
