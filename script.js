/*
 * Script principal pour NovaSoft.
 * Ce script ajoute un effet dynamique à la barre de navigation lorsque l'utilisateur fait défiler la page.
 */

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    // Ajout ou retrait de la classe 'scrolled' selon la position de défilement
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Gestion de l'ouverture/fermeture de la fenêtre modale des mentions légales
    const legalLinks = document.querySelectorAll('.legal-link');
    const legalModal = document.getElementById('legal-modal');
    const closeModalBtn = legalModal ? legalModal.querySelector('.close-modal') : null;

    function showLegalModal(event) {
        event.preventDefault();
        if (legalModal) {
            legalModal.style.display = 'flex';
        }
    }

    function hideLegalModal() {
        if (legalModal) {
            legalModal.style.display = 'none';
        }
    }

    // Attache les événements aux liens « Mentions légales » du menu et du pied de page
    if (legalLinks) {
        legalLinks.forEach(link => {
            link.addEventListener('click', showLegalModal);
        });
    }
    // Bouton de fermeture
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideLegalModal);
    }
    // Fermer la modale en cliquant en dehors du contenu
    if (legalModal) {
        legalModal.addEventListener('click', (event) => {
            if (event.target === legalModal) {
                hideLegalModal();
            }
        });
    }
});