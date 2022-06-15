let intervalId;
let totaleTijdInSeconden;
let ingevoerdeMinuten;
let timeContainer = document.querySelector('.time');
let dropdown = document.querySelector('[data-dropdown]');
let menuContainer = document.querySelector('[data-popup-content]');

const timerControls = '<button class="small-btn" data-pause-timer>Pause</button><button class="small-btn" data-stop-timer>Stop</button>';
const timerInput = '<input id="minutes" type="number" placeholder="Aantal minuten"> <button class="small-btn" data-set-timer>Set</button>';

function closePopup(){
   dropdown.classList.remove('active');
}

function leegInterval(){
  clearInterval(intervalId);
  intervalId = null; 
}

function startTimer() {
  if(!intervalId) {
    intervalId = setInterval(timer, 1000);
  } else {
    return;
  }
}

function pauseTimer() {
    leegInterval();
    let btn = document.querySelector('[data-pause-timer]');
    btn.removeAttribute('data-pause-timer');
    btn.setAttribute('data-resume-timer', '');
    btn.innerHTML = 'Play';
}

function resumeTimer(){
    startTimer();
    let btn = document.querySelector('[data-resume-timer]');
    btn.removeAttribute('data-resume-timer');
    btn.setAttribute('data-pause-timer', '');
    btn.innerHTML = 'Pause';
}

function stopTimer() {
  leegInterval();
  if(totaleTijdInSeconden > 0) {
    totaleTijdInSeconden = 0;
    timeContainer.innerHTML= '00:00:00';
  }
  closePopup();
  bepaalPopupContent();
}

function stelTimerIn() {
  let minutenInput = document.getElementById('minutes').value;
  let minutenInNumber = Number(minutenInput); 
  ingevoerdeMinuten = minutenInNumber;
  totaleTijdInSeconden = ingevoerdeMinuten * 60;
  closePopup();
  startTimer();
}

function timer(){
  let uren = Math.floor(totaleTijdInSeconden / 3600);
  let minuten = Math.floor((totaleTijdInSeconden - (uren * 3600)) / 60);
  let seconden = totaleTijdInSeconden % 60;
  uren = uren < 10 ? '0' + uren : uren;
  minuten = minuten < 10 ? '0' + minuten : minuten;
  seconden = seconden < 10 ? '0' + seconden : seconden;
  timeContainer.innerHTML = `${uren}:${minuten}:${seconden}`;
  totaleTijdInSeconden--;
  (totaleTijdInSeconden < 0) ? clearInterval() : false;
}


function timerActies(e) {
  const isSetButton = e.target.matches('[data-set-timer]');
  const isPauseButton = e.target.matches('[data-pause-timer]');
  const isResumeButton = e.target.matches('[data-resume-timer]');
  const isStopButton = e.target.matches('[data-stop-timer]');
  
  if(isSetButton) {
    stelTimerIn();
  } else if (isPauseButton) {
    pauseTimer();
  } else if (isResumeButton) {
    resumeTimer();
  } else if (isStopButton){
    stopTimer();
  } else {
    return
  }
}

document.addEventListener('click', e => {
  const isDropdownButton = e.target.matches('[data-dropdown-button]');
    if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return
    let currentDropdown;
    if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    }

    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove('active');
    });

    bepaalPopupContent();
    document.addEventListener('click', timerActies);
});

function bepaalPopupContent (){
    if (intervalId) {
        menuContainer.innerHTML = timerControls;
    } else {
        menuContainer.innerHTML = timerInput;
    }
}








/* 

let timeContainer = document.querySelector('.time')
let ingevoerdeMinuten;
let totaleTijdInSeconden;
let saveBtn = document.querySelector('[data-set-timer]');
let intervalID;
let

function startTimer() {
    if (!intervalID) {
        intervalID = setInterval(updateCountdown, 1000);
    } else {
        return;
    }
}

function stopTimer() {
    clearInterval(intervalID);
    intervalID = null;
    toonPopupContent();
}

function toonPopupContent() {
    let menuContent = document.querySelector('.dropdown-menu');
    if (intervalID == true) {
        menuContent.innerHTML = '<button class="small-btn">Pause</button><button class="small-btn" data-stop-timer>Stop</button>'
    } else {
        menuContent.innerHTML = '<input id="minutes" type="number" placeholder="Aantal minuten"> <button class="small-btn" data-set-timer>Set</button>'
    }
}

document.addEventListener('click', e => {
    let stopBtn = e.target.matches('[data-stop-timer]');
    if (stopBtn) {
        stopTimer();
        timeContainer.innerHTML = '00:00:00'
        document.querySelector('[data-dropdown].active').classList.remove('active');
    }
})

document.addEventListener('click', e => {
    const isDropdownButton = e.target.matches('[data-dropdown-button]');
    if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return

    let currentDropdown
    if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
        toonPopupContent();
    }

    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove('active');
    })
});


saveBtn.addEventListener('click', e => {
    let tijddata = document.getElementById('minutes').value;
    document.getElementById('minutes').value = null;
    let omzetten = Number(tijddata);
    ingevoerdeMinuten = omzetten;
    totaleTijdInSeconden = ingevoerdeMinuten * 60;
    stopTimer();
    startTimer();
    document.querySelector('[data-dropdown].active').classList.remove('active');
});



function updateCountdown() {
    let uren = Math.floor(totaleTijdInSeconden / 3600);
    let minuten = Math.floor((totaleTijdInSeconden - (uren * 3600)) / 60);
    let seconden = totaleTijdInSeconden % 60;
    uren = uren < 10 ? '0' + uren : uren;
    minuten = minuten < 10 ? '0' + minuten : minuten;
    seconden = seconden < 10 ? '0' + seconden : seconden;

    timeContainer.innerHTML = `${uren}:${minuten}:${seconden}`;
    totaleTijdInSeconden--;
    if (totaleTijdInSeconden < 0) {
        stopTimer();
    }
} */