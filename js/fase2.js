document.addEventListener("DOMContentLoaded", () => {
    const optionButtons = document.querySelectorAll('.option-btn');

    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            optionButtons.forEach(btn => {
                btn.querySelector('.icon').innerHTML = '';
            });

            const isCorrect = this.getAttribute('data-correct') === 'true';
            const iconSpan = this.querySelector('.icon');

            if (isCorrect) {
                iconSpan.innerHTML = '✅'; 
            } else {
                iconSpan.innerHTML = '❌'; 
            }
        });
    });
});