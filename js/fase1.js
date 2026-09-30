document.addEventListener("DOMContentLoaded", () => {
    // IMPORTANTE: Mude este número em cada ficheiro (fase2.js = 2, fase3.js = 3, etc.)
    const currentPhase = 1;

    if (typeof guardPhaseAccess === 'function' && !guardPhaseAccess(currentPhase)) {
        return;
    }

    const optionButtons = document.querySelectorAll(".option-btn");
    const nextButton = document.querySelector(".btn-proximo");
    // Procura o link  que envolve o botão PRÓXIMO no HTML
    const linkProximo = nextButton ? nextButton.closest('a') : null;

    // Função auxiliar para mudar o visual e o estado do botão
    const atualizarBotaoProximo = (liberado) => {
        if (!nextButton) return;
        
        if (liberado) {
            nextButton.classList.remove("disabled");
            nextButton.removeAttribute("aria-disabled");
            nextButton.style.backgroundColor = "#61c9f8"; // Azul (liberado)
            nextButton.style.cursor = "pointer";
        } else {
            nextButton.classList.add("disabled");
            nextButton.setAttribute("aria-disabled", "true");
            nextButton.style.backgroundColor = "#cccccc"; // Cinzento (bloqueado)
            nextButton.style.cursor = "not-allowed";
        }
    };

    // Verifica se a fase já tinha sido concluída anteriormente
    const faseJaCompletada = typeof isPhaseCompleted === 'function' ? isPhaseCompleted(currentPhase) : false;
    atualizarBotaoProximo(faseJaCompletada);

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

                // Regista a fase como concluída no sistema original
                if (typeof completePhase === 'function') {
                    completePhase(currentPhase);
                }

                // Liberta o botão PRÓXIMO
                atualizarBotaoProximo(true);
            } else {
                if (iconSpan) iconSpan.innerHTML = "❌";
                this.classList.add("selected-wrong");
                
                // Bloqueia o botão PRÓXIMO se clicar na errada
                atualizarBotaoProximo(false);
            }
        });
    });

    // Controla o clique no link para a próxima página
    if (linkProximo) {
        linkProximo.addEventListener("click", (event) => {
            // Se o botão ainda tiver a classe "disabled", impede a navegação
            if (nextButton.classList.contains("disabled")) {
                event.preventDefault(); 
            }
            // Se estiver libertado, o próprio  do HTML faz o redirecionamento correto
        });
    }
});