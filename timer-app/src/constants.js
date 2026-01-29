export const STATES = {
    IDLE: 'idle',
    FOCUS: 'focus',
    WARNING: 'warning',
    PAUSED: 'paused'
};

export const DURATIONS = {
    MAIN_FOCUS: 8 * 60 * 60, // 8 hours countdown
    PRESENCE_CHECK: 20 * 60, // 20 minutes until the check-in
    WARNING: 60,             // 1 minute warning
    COOLDOWN: 30             // hover cooldown in seconds
};

export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}
