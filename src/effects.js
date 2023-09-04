//Title Typing Effect
document.addEventListener('DOMContentLoaded', () => {
    const $pageTitle = document.querySelector('#page_title');

    const textToType = 'Currency Converter';

    let currentIndex = 0;

    function typeTextEffect() {
        if (currentIndex < textToType.length) {
            $pageTitle.textContent += textToType.charAt(currentIndex);
            currentIndex++;
            setTimeout(typeTextEffect, 100);
        } else {
            $pageTitle.textContent = $pageTitle.textContent;
        }
    }

    window.addEventListener('load', function() {
        typeTextEffect();
    })
});

//Form animations
document.addEventListener('DOMContentLoaded', () => {
    const $form = document.querySelector('#currency_converter_form');
    const $calculateBtn = document.querySelector('#calculateBtn');

    $form.classList.add('animate-slide-in-left');

    $calculateBtn.addEventListener('click', () => {
        $form.classList.add('animate-fade-out');
    });
});