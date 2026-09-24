document.addEventListener("DOMContentLoaded", () => {
    const phaseNodes = document.querySelectorAll("[data-phase]");
    const finalNode = document.querySelector("[data-final]");
    const restartButton = document.querySelector("#restart-game");

    phaseNodes.forEach(node => {
        const phase = Number(node.dataset.phase);

        if (isPhaseCompleted(phase)) {
            node.classList.add("completed");
        }

        if (!isPhaseUnlocked(phase)) {
            node.classList.add("locked");
            node.setAttribute("aria-disabled", "true");
            node.addEventListener("click", event => {
                event.preventDefault();
            });
        }
    });

    if (finalNode) {
        if (isPhaseCompleted(6)) {
            finalNode.classList.add("completed");
        } else {
            finalNode.classList.add("locked");
        }
    }

    if (restartButton) {
        restartButton.addEventListener("click", event => {
            event.preventDefault();
            resetGameProgress();
            window.location.href = "fase1.html";
        });
    }
});
