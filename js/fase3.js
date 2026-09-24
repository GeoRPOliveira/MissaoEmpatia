document.addEventListener("DOMContentLoaded", () => {
    const currentPhase = 3;

    if (!guardPhaseAccess(currentPhase)) {
        return;
    }

    const optionButtons = document.querySelectorAll(".option-btn");
    const nextButton = document.querySelector(".btn-proximo");

    // A próxima fase só fica disponível depois de uma resposta correta.
    if (nextButton && !isPhaseCompleted(currentPhase)) {
        nextButton.classList.add("disabled");
        nextButton.setAttribute("aria-disabled", "true");
    } else if (nextButton) {
        nextButton.classList.remove("disabled");
        nextButton.removeAttribute("aria-disabled");
    }

    optionButtons.forEach(button => {
        button.addEventListener("click", function () {
            optionButtons.forEach(btn => {
                const icon = btn.querySelector(".icon");
                if (icon) icon.innerHTML = "";
                btn.classList.remove("selected-correct", "selected-wrong");
            });

            const isCorrect = this.getAttribute("data-correct") === "true";
            const iconSpan = this.querySelector(".icon");

            if (isCorrect) {
                if (iconSpan) iconSpan.innerHTML = "✅";
                this.classList.add("selected-correct");

                completePhase(currentPhase);

                if (nextButton) {
                    nextButton.classList.remove("disabled");
                    nextButton.removeAttribute("aria-disabled");
                }
            } else {
                if (iconSpan) iconSpan.innerHTML = "❌";
                this.classList.add("selected-wrong");
            }
        });
    });

    if (nextButton) {
        nextButton.addEventListener("click", (event) => {
            if (!isPhaseCompleted(currentPhase)) {
                event.preventDefault();
                return;
            }

            window.location.href = "fase4.html";
        });
    }
});
