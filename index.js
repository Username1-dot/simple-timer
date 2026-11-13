const timerElement = document.getElementById("timer");
function displayTimer(time) {
    let timeString = ["", "", ""];
    for(let i = 0; i < time.length; i++) {
        if(time[i] < 10) {
            timeString[i] = "0" + time[i];
        }
        else {
            timeString[i] = time[i];
        }
    }
    timerElement.innerText = `${timeString[0]}:${timeString[1]}:${timeString[2]}`;
}

function calculateNewTime(time) {
    let newTime = [0, 0, 0];
    if(time[2] == 0) {
        newTime[2] = 59;
        if(time[1] == 0) {
            newTime[1] = 59;
            newTime[0] = time[0]--;
        }
        else {
            newTime[1] = time[1]--;
        }
    }
    else {
        newTime[2] = time[2]--;
    }
    return newTime;
}

testTimer = [1, 30, 24];
displayTimer(calculateNewTime(testTimer));
setInterval(() => {
    displayTimer(calculateNewTime(testTimer));
}, 1000);
