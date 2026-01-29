import { STATES, DURATIONS, formatTime } from "./constants.js";
import { getCurrentState, setState, TRIGGERS } from "./state/appState.js";
import {
    startPresenceTimer,
    resetPresenceTimer,
    startWarningTimer,
    stopWarningTimer
} from './timers/index.js';
import { startMainTimer, pauseMainTimer } from "./timers/index.js"; 

let focusDisplayInterval = null;
let focusTime = 0;
// DOM
function startFocusDisplay(duration) {
    clearInterval(focusDisplayInterval);
    focusTime = duration;
    periodTimerDisplay.textContent = formatTime(focusTime);

    focusDisplayInterval = setInterval(() => {
        focusTime--;
        periodTimerDisplay.textContent = formatTime(focusTime);
    }, 1000);
}

function stopFocusDisplay() {
    clearInterval(focusDisplayInterval);
}

const startBtn = document.getElementById('start-btn');
const periodTimerDisplay = document.getElementById('period-timer-display');

const INTERACTION_EVENTS = ['mousemove','keydown','mousedown','scroll','touchstart'];
let canResetPresenceTimer = true;

/* --------------------
   START BUTTON
-------------------- */
startBtn.addEventListener('click', () => {
    setState(STATES.FOCUS);

    document.getElementById('idle-container').style.display = 'none';
    document.getElementById('timer-container').style.display = 'block';

    startFocusDisplay(DURATIONS.PRESENCE_CHECK); // ✅ UI timer
    startPresenceTimer(DURATIONS.PRESENCE_CHECK, enterWarningState); // ✅ watchdog
});


/* --------------------
   USER INTERACTION
-------------------- */
function handleUserInteraction(){
    if(!canResetPresenceTimer) return;

    if(getCurrentState() === STATES.FOCUS){
        resetPresenceTimer(DURATIONS.PRESENCE_CHECK);
    }

    if(getCurrentState() === STATES.WARNING){
        cancelWarningAndResume();
    }

    canResetPresenceTimer = false;
    setTimeout(() => { canResetPresenceTimer = true; }, DURATIONS.COOLDOWN * 1000);
}

INTERACTION_EVENTS.forEach(event => {
    document.addEventListener(event, handleUserInteraction);
});

/* --------------------
   STATE TRANSITIONS
-------------------- */
function enterWarningState() {
    setState(STATES.WARNING);
    stopFocusDisplay();

    startWarningTimer(
        DURATIONS.WARNING,
        (t) => periodTimerDisplay.textContent = formatTime(t),
        enterPausedState
    );
}

function cancelWarningAndResume(){
    stopWarningTimer();
    resetPresenceTimer(DURATIONS.PRESENCE_CHECK);
    setState(STATES.FOCUS);
}

function enterPausedState(){
    setState(STATES.PAUSED);
}

/* --------------------
   UI HELPERS
-------------------- */
function updateWarningUI(secondsLeft){
    periodTimerDisplay.textContent = formatTime(secondsLeft);
}
