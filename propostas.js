document.addEventListener('DOMContentLoaded', () => {
    const filtrosContainer = document.querySelector('.filtros-container');
    const heroSection = document.querySelector('.propostas-hero');
    
    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom) {
            filtrosContainer.classList.add('stick-to-top');
        } else {
            filtrosContainer.classList.remove('stick-to-top');
        }
    });
});