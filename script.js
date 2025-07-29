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
});