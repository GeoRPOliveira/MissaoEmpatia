const GAME_PROGRESS_KEY = "missaoEmpatiaProgress";

function getGameProgress() {
    try {
        return JSON.parse(localStorage.getItem(GAME_PROGRESS_KEY)) || {
            completedPhases: []
        };
    } catch {
        return {
            completedPhases: []
        };
    }
}

function saveGameProgress(progress) {
    localStorage.setItem(GAME_PROGRESS_KEY, JSON.stringify(progress));
}

function isPhaseCompleted(phase) {
    return getGameProgress().completedPhases.includes(phase);
}

function isPhaseUnlocked(phase) {
    return phase === 1 || isPhaseCompleted(phase - 1);
}

function completePhase(phase) {
    const progress = getGameProgress();

    if (!progress.completedPhases.includes(phase)) {
        progress.completedPhases.push(phase);
        progress.completedPhases.sort((a, b) => a - b);
        saveGameProgress(progress);
    }
}

function resetGameProgress() {
    localStorage.removeItem(GAME_PROGRESS_KEY);
}

function guardPhaseAccess(phase) {
    if (!isPhaseUnlocked(phase)) {
        window.location.href = "InicialGamePage.html";
        return false;
    }

    return true;
}
