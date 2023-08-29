let [seconds, minutes, hours] = [0, 0, 0];
let displayTime = document.getElementById("displayTime");
let timer = null;

function stopwatch() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    displayTime.innerHTML = h + ":" + m + ":" + s;
}

function watchStart() {
    if (timer != null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 1000);
}

function watchStop() {
    clearInterval(timer);
}
function watchReset() {
    clearInterval(timer);
    [seconds, minutes, hours] = [0, 0, 0];
    displayTime.innerHTML = "00:00:00"
}


let endTime;
let interval;
let remainingTime = 0;
let initialTime = 0;
let running = false;

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

function startTimer() {
    interval = setInterval(updateTime, 10);
    running = true;
}

function updateTime() {
    const currentTime = Date.now();
    remainingTime = endTime - currentTime;

    if (remainingTime <= 0) {
        clearInterval(interval);
        running = false;
        document.getElementById("display").textContent = "00:00:000";
    } else {
        const formattedTime = formatTime(remainingTime);
        document.getElementById("display").textContent = formattedTime;
    }
}

function formatTime(timeInMilliseconds) {
    const date = new Date(timeInMilliseconds);
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
}

function Start() {
    if (!running) {
        endTime = Date.now() + remainingTime;
        startTimer();
    }
}

function Stop() {
    clearInterval(interval);
    running = false;
}

function Reset() {
    clearInterval(interval);
    running = false;
    remainingTime = initialTime;
    document.getElementById("display").textContent = formatTime(remainingTime);
}

function SetTime() {
    if (!running) {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        initialTime = hours * 3600000 + minutes * 60000 + seconds * 1000;
        remainingTime = initialTime;
        document.getElementById("display").textContent = formatTime(remainingTime);
    }
}

Reset();
