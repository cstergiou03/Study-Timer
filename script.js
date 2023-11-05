const hour = document.getElementById("hour");
const timer = document.getElementById("timer");
const buttonStart = document.getElementById("start");
const buttonReset = document.getElementById("reset");
var setTimer = document.getElementById("appt");

buttonStart.addEventListener("click", startTimer);
buttonReset.addEventListener("click", resetTimer);

let countDownInterval;
let remainingTime = 0;

function startTimer() {
    if (countDownInterval) {
        clearInterval(countDownInterval);
    }

    const inputTime = setTimer.value;

    const parts = inputTime.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);

    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();


    if (currentHours < hours || (currentHours === hours && currentMinutes < minutes)) {
        remainingTime = (hours - currentHours) * 3600 + (minutes - currentMinutes) * 60;
    } else {
        remainingTime = (24 - currentHours + hours) * 3600 + (minutes - currentMinutes) * 60;
    }

    countDownInterval = setInterval(updateTimer, 1000, remainingTime);
}

function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        timer.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingTime % 60).padStart(2, '0')}`;
    } else {
        clearInterval(countDownInterval);
    }
}

function resetTimer() {
    clearInterval(countDownInterval);
    remainingTime = 0;
    timer.innerHTML = "00:00:00";
}

function time() {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    hour.innerHTML = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;
}


setInterval(time, 1000);
