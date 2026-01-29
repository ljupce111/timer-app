import { DURATIONS } from "../constants.js";
import { currentState } from "../state/appState.js";

let mainTimeLeft = DURATIONS.MAIN_FOCUS;
let mainInterval = null;

export function startMainTimer(onTick, onFinish) {
    if (mainInterval) return;

    onTick(mainTimeLeft);

    mainInterval = setInterval(() => {
        if (currentState !== 'focus') return;

        mainTimeLeft--;
        onTick(mainTimeLeft);

        if (mainTimeLeft <= 0) {
            clearInterval(mainInterval);
            mainInterval = null;
            onFinish?.();
        }
    }, 1000);
}

export function pauseMainTimer() {
    clearInterval(mainInterval);
    mainInterval = null;
}

export function resetMainTimer() {
    pauseMainTimer();
    mainTimeLeft = DURATIONS.MAIN_FOCUS;
}

export function getMainTimeLeft() {
    return mainTimeLeft;
}
