// presenceTimer.js

let presenceInterval = null;
let presenceTimeLeft = 0;   // ✅ declare first

export function startPresenceTimer(duration, onExpire, onTick) {
        console.log('startPresenceTimer called with:', duration);

    stopPresenceTimer();     // clears old interval
    presenceTimeLeft = duration;  // ✅ safe now

    if (onTick) onTick(presenceTimeLeft);

    presenceInterval = setInterval(() => {
    console.log('presence tick', presenceTimeLeft);
    presenceTimeLeft--;
    if (onTick) onTick(presenceTimeLeft);

    if (presenceTimeLeft <= 0) {
        stopPresenceTimer();
        if (onExpire) onExpire();
    }
}, 1000);
}

export function resetPresenceTimer(duration) {
    presenceTimeLeft = duration;
}

export function stopPresenceTimer() {
    if (presenceInterval) {
        clearInterval(presenceInterval);
        presenceInterval = null;
    }
}

export function getPresenceTimeLeft() {
    return presenceTimeLeft;
}
