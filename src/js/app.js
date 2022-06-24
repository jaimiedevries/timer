const PAUSE_TIMER_ATTRIBUTE = 'data-pause-timer';
const RESUME_TIMER_ATTRIBUTE = 'data-resume-timer';
const TIMER_CONTROLS = `<button class="small-btn" data-pause-timer>Pause</button><button class="small-btn" data-stop-timer>Stop</button>`;
const TIMER_INPUT = '<input id="minutes" type="number" placeholder="Aantal minuten"> <button class="small-btn" data-set-timer>Set</button>';

let intervalId;
let totaleTijdInSeconden;
let timeContainer = document.querySelector('.time');
let dropdown = document.querySelector('[data-dropdown]');
let menuContainer = document.querySelector('[data-popup-content]');
let pauze = false;

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
  }
}

function replaceAttributeWithButtonText(attributeToRemove, attributeToReplace, text) {
  let btn = document.querySelector(`[${attributeToRemove}]`);
  if(!btn) return;

  btn.removeAttribute(attributeToRemove);
  btn.setAttribute(attributeToReplace, '');
  btn.innerHTML = text;
}

function pauseTimer() {
  pauze = true;
  leegInterval();
  replaceAttributeWithButtonText(PAUSE_TIMER_ATTRIBUTE, RESUME_TIMER_ATTRIBUTE, 'Play');
}

function resumeTimer(){
  pauze = false;
  startTimer();
  replaceAttributeWithButtonText(RESUME_TIMER_ATTRIBUTE, PAUSE_TIMER_ATTRIBUTE, 'Pause');
}

function stopTimer() {
  leegInterval();
  if(totaleTijdInSeconden > 0) {
    totaleTijdInSeconden = 0;
    timeContainer.innerHTML= '00:00:00';
  }
  closePopup();
}

function stelTimerIn() {
  let minutenInput = document.getElementById('minutes').value;
  let minutenInNumber = Number(minutenInput);
  totaleTijdInSeconden = minutenInNumber * 60;
  closePopup();
  startTimer();
}

function formatPartialTime(input) {
  return input < 10 ? `0${input}` : input.toString();
}

function timer(){
  let uren = Math.floor(totaleTijdInSeconden / 3600);
  let minuten = Math.floor((totaleTijdInSeconden - (uren * 3600)) / 60);
  let seconden = totaleTijdInSeconden % 60;
  timeContainer.innerHTML = `${formatPartialTime(uren)}:${formatPartialTime(minuten)}:${formatPartialTime(seconden)}`;
  totaleTijdInSeconden--;
  if (totaleTijdInSeconden <= 0) {
    clearInterval();
  }
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
      if(dropdown == currentDropdown) return;
      dropdown.classList.remove('active');
    });

    bepaalPopupContent();
    document.addEventListener('click', timerActies);
});

function bepaalPopupContent () {
    menuContainer.innerHTML = intervalId || pauze ? TIMER_CONTROLS : TIMER_INPUT;
    if(pauze) {
      replaceAttributeWithButtonText(PAUSE_TIMER_ATTRIBUTE, RESUME_TIMER_ATTRIBUTE, 'Play');
    }
}




// ----- Elke btn zijn eigen afhandeling laten doen i.p.v. alle clicks op het document checken of het een van de knoppen is

// document.querySelector('#drop-down-button').addEventListener('click', e => {
//   console.log('foo');
// });

// document.querySelector('.drop-down-menu').addEventListener('click', timerActies);

// document.querySelector('#pause-or-start-btn').addEventListener('click', e => {
//   const isSetButton = e.target.matches('[data-set-timer]');
//   const isPauseButton = e.target.matches('[data-pause-timer]');
//   const isResumeButton = e.target.matches('[data-resume-timer]');

//   if(isSetButton) {
//     stelTimerIn();
//   } else if (isPauseButton) {
//     pauseTimer();
//   } else if (isResumeButton) {
//     resumeTimer();
//   }
// });

// document.querySelector('#stop-btn').addEventListener('click', e => {
//   if(intervalId) {
//     stopTimer();
//   }
// });

// ----- End



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