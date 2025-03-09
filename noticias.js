document.addEventListener('DOMContentLoaded', () => {
    const noticiaCards = document.querySelectorAll('.noticia-card');
    
    noticiaCards.forEach(card => {
        card.addEventListener('click', () => {
            const expandedContent = card.querySelector('.noticia-expandida');
            expandedContent.classList.toggle('active');
        });
    });
});