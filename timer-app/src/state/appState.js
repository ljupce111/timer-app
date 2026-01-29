import { STATES } from '../constants.js';

let currentState = STATES.IDLE;

export function getCurrentState() {
    return currentState;
}

export function setState(newState) {
    console.log(`STATE CHANGE: ${currentState} → ${newState}`);
    currentState = newState;
}

// Triggers map
export const TRIGGERS = {
    [STATES.IDLE]: ["start"],
    [STATES.FOCUS]: ["periodExpired"],
    [STATES.WARNING]: ["cancel"],
    [STATES.PAUSED]: ["resume"]
};
