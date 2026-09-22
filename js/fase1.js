document.addEventListener("DOMContentLoaded", () => {
    const optionButtons = document.querySelectorAll('.option-btn');

    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Primeiro, limpa o ícone de todas as opções caso o usuário clique em outra
            optionButtons.forEach(btn => {
                btn.querySelector('.icon').innerHTML = '';
            });

            // Verifica se a opção clicada é a correta
            const isCorrect = this.getAttribute('data-correct') === 'true';
            const iconSpan = this.querySelector('.icon');

            if (isCorrect) {
                // Se for a Opção A
                iconSpan.innerHTML = '✅'; 
            } else {
                // Se for a Opção B ou C
                iconSpan.innerHTML = '❌'; 
            }
        });
    });
});