const timerElement = document.getElementById("timer");
const timerNameElement = document.getElementById("timerName");
const date = new Date();
let timerPaused = true;
let timerReset = false;

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

// function calculateNewTime(time) {
//     let newTime = [0, 0, 0];
//     if (time[2] == 0) {
//         newTime[2] = 59;
//         if (time[1] == 0) {
//             newTime[1] = 59;
//             newTime[0] = time[0]--;
//         }
//         else {
//             newTime[1] = time[1]--;
//         }
//     }
//     else {
//         newTime[2] = time[2]--;
//     }
//     return newTime;
// }

function calculateNewTime(time) {
    newTime = time;
    if (time[2] === 0) {
        newTime[2] = 59;
        if(time[1] === 0) {
            newTime[1] = 59;
            newTime[0]--;
        }
        else {
            newTime[1]--;
        }
    }
    else {
        newTime[2]--;
    }
    return newTime;
}

function checkAutoplay() {
    let autoplayButton = document.getElementById("autoplay");
    if (autoplayButton.checked) {
        document.getElementById("testParagraph").innerText = "Checked"
        // Replace with code when button is checked
    }
    else {
        document.getElementById("testParagraph").innerText = "Unchecked"
        // Replace with code when button is unchecked
    }
}

function startPressed() {
    timerPaused = false;
}

function stopPressed() {
    timerPaused = true;
}

function resetPressed() {
    timerReset = true;
}



// name: {date, priority, duration}
// Date: the day of the month that the timer is automatically chosen.
// Priority: which timer is first?(1 = first, 2 = second, etc.)
// Duration: An array specifying the total duration.
// Example:
// exampleTimer: {23, 1, [0, 15, 0]}
examArray = [
    ["NST Reading", 12, [0, 10, 0]],
    ["NST Test", 12, [1, 30, 0]],
    ["Afrikaans Reading", 13, [0, 10, 0]],
    ["Afrikaans Test", 13, [1, 30, 0]],
    ["Maths 1 Reading", 16, [0, 10, 0]],
    ["Maths 1 Test", 16, [1, 30, 0]],
    ["Robotics Reading", 17, [0, 10, 0]],
    ["Robotics Test", 17, [1, 30, 0]]
]
testArray = [
    [16, 1, [0, 0, 10]],
    [16, 2, [0, 0, 10]]
];

// let currentTimer = examArray[0][2];
// let currentTimerBackup = examArray[0][2];
// let time = currentTimer;
// let time_ms = 0;

// let i = 0;

// while (examArray[i][1] < new Date().getDate() && i < examArray.length) {
    
// }

let currentTimer = [0, 0, 0];
let time = currentTimer;
// let timerIndex = 0;
let time_ms = 0;

for (let i = 0; i < examArray.length; i++) {
    if (examArray[i][1] == date.getDate()) {
        currentTimer = examArray[i][2];
        timerIndex = i;
    }
    if (examArray.length - 1 == i && examArray[i][1] < date.getDate()) {
        currentTimer = examArray[0][2];
        timerIndex = 0;
    }
}

function nextPressed() {
    if (timerIndex + 1 < examArray.length) {
        timerIndex++;
        currentTimer = examArray[timerIndex][2];
        displayTimer(currentTimer);
    }
}

function prevPressed() {
    if (timerIndex - 1 >= 0) {
        timerIndex--;
        currentTimer = examArray[timerIndex][2];
    displayTimer(currentTimer);
    }
}

displayTimer(currentTimer);

setInterval(() => {
    time_ms += 10;
    if(time_ms == 1000) {
        if(!timerPaused) {
            if(timerReset) {
                time = currentTimer;
                displayTimer(currentTimer);
                timerReset = false;
            }
            else {
                // time = calculateNewTime(time);
                // displayTimer(time);
                displayTimer(calculateNewTime(currentTimer));
            }
        }
        time_ms = 0;
    }
    timerNameElement.innerText = examArray[timerIndex][0];
    checkAutoplay();
}, 10);



// setInterval(() => {
//     if(!timerPaused) {
//         // if(timerReset) {
//         //     time = currentTimer;
//         //     displayTimer(currentTimer);
//         //     timerReset = false;
//         // }
//         // else {
//             time = calculateNewTime(time);
//             displayTimer(time);
//         // }
//     }
// }, 1000);