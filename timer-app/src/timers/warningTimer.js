let warningInterval = null;
let warningTimeLeft = 0;

export function startWarningTimer(duration, onTick, onExpire) {
    stopWarningTimer();
    warningTimeLeft = duration;
    onTick(warningTimeLeft);

    warningInterval = setInterval(() => {
        warningTimeLeft--;
        onTick(warningTimeLeft);

        if(warningTimeLeft <= 0){
            stopWarningTimer();
            onExpire();
        }
    }, 1000);
}

export function stopWarningTimer() {
    if(warningInterval){
        clearInterval(warningInterval);
        warningInterval = null;
    }
}

export function getWarningTimeLeft() {
    return warningTimeLeft;
}
