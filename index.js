const timerElement = document.getElementById("timer");
const timerNameElement = document.getElementById("timerName");
const date = new Date();
const timerAudio = new Audio("assets/timer-beep.mp3");
timerAudio.volume = 0.5
const wordClock = document.getElementById("wordClock");
let timerPaused = true;
let timerReset = false;
let beeps = 0;


// name: {date, priority, duration}
// Date: the day of the month that the timer is automatically chosen.
// Priority: which timer is first?(1 = first, 2 = second, etc.)
// Duration: An array specifying the total duration.
// Example:
// exampleTimer: {23, 1, [0, 15, 0]}
let examArray_NOT_USED = [
    ["NST Reading", 12, [0, 10, 0]], ["NST Test", 12, [1, 30, 0]],
    ["Afrikaans Reading", 13, [0, 10, 0]], ["Afrikaans Test", 13, [1, 30, 0]],
    ["Maths 1 Reading", 16, [0, 10, 0]], ["Maths 1 Test", 16, [1, 30, 0]],
    ["Robotics Reading", 17, [0, 10, 0]], ["Robotics Test", 17, [1, 30, 0]],
    ["Geography Reading", 19, [0, 10, 0]], ["Geography Test", 19, [1, 30, 0]],
    ["Maths 2 Reading", 20, [0, 10, 0]], ["Maths 2 Test", 20, [1, 30, 0]],
    ["History Reading", 23, [0, 10, 0]], ["History Test", 23, [1, 30, 0]],
    ["English Reading", 24, [0, 10, 0]], ["English Test", 24, [1, 30, 0]]
];

let examArrayAfrikaans = [
    ["NW Lees", 12, [0, 10, 0]], ["NW Toets", 12, [1, 30, 0]],
    ["Afrikaans Lees", 13, [0, 10, 0]], ["Afrikaans Toets", 13, [1, 30, 0]],
    ["Wiskunde 1 Lees", 16, [0, 10, 0]], ["Wiskunde 1 Toets", 16, [1, 30, 0]],
    ["Robotics Lees", 17, [0, 10, 0]], ["Robotics Toets", 17, [1, 30, 0]],
    ["Geografie Lees", 19, [0, 10, 0]], ["Geografie Toets", 19, [1, 30, 0]],
    ["Wiskunde 2 Lees", 20, [0, 10, 0]], ["Wiskunde 2 Toets", 20, [1, 30, 0]],
    ["Geskiedenis Lees", 23, [0, 10, 0]], ["Geskiedenis Toets", 23, [1, 30, 0]],
    ["Engels Lees", 24, [0, 10, 0]], ["Engels Toets", 24, [1, 30, 0]]
];
let testArray = [
    [16, 1, [0, 0, 10]],
    [16, 2, [0, 0, 10]]
];


// Previous and next logic: make sure to make a deep     copy of the object
for (let i = 0; i < examArrayAfrikaans.length; i++) {
    if (examArrayAfrikaans[i][1] == date.getDate()) {
        currentTimer = [...examArrayAfrikaans[i][2]];
        timerIndex = i;
        break;
    }
    if (examArrayAfrikaans.length - 1 == i && examArrayAfrikaans[i][1] != date.getDate()) {
        currentTimer = [...examArrayAfrikaans[0][2]];
        timerIndex = 0;
    }
}

let time_ms = 0;
displayTimer(currentTimer)


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
    console.log(`world time: ${timeString}`);
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

function nextPressed() {
    if (timerIndex + 1 < examArrayAfrikaans.length) {
        timerIndex++;
        currentTimer = [...examArrayAfrikaans[timerIndex][2]];
        displayTimer(currentTimer);
        beeps = 0;
    }
}

function prevPressed() {
    if (timerIndex - 1 >= 0) {
        timerIndex--;
        currentTimer = [...examArrayAfrikaans[timerIndex][2]];
        displayTimer(currentTimer);
        beeps = 0;
    }
}

function startPressed() {
    console.log('Starting...')
    timerPaused = false;
}

function stopPressed() {
    console.log('Stopping...')
    timerPaused = true;
}

function resetPressed() {
    console.log('Reset pressed')
    beeps = 0;

    // reset the timer by deep copy of the original timer values
    currentTimer = [...examArrayAfrikaans[timerIndex][2]];

    console.log(currentTimer)
    displayTimer(currentTimer);
    timerReset = true;
}


// main timer loop
setInterval(() => {
    time_ms += 100;
    displayWordClock();
    checkAutoplay();
    if(!timerPaused && time_ms >= 1000) {
        if (currentTimer > [0, 0, 0]) {
            let time = calculateNewTime(currentTimer);
            displayTimer(time);
            time_ms = 0;
        }
        else {
            
            if (beeps < 1) {
                if(document.getElementById("autoplay").checked) {
                    if (timerIndex + 1 < examArrayAfrikaans.length) {
                        nextPressed();
                    }
                }
                timerAudio.play();
                beeps++;
            }
        }
        
    }
    timerNameElement.innerText = examArrayAfrikaans[timerIndex][0];
}, 100);
