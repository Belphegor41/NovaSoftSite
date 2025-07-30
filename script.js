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

    /**
     * Implémentation d'un petit assistant de chat.
     * Le widget affiche un bouton flottant qui, lorsqu'on clique dessus, fait apparaître une boîte de dialogue.
     * L'assistant répond avec des messages prédéfinis en fonction de quelques mots clés courants.
     */
    const chatButton = document.getElementById('chat-button');
    const chatBox = document.getElementById('chat-box');
    if (chatButton && chatBox) {
        const chatHeaderClose = chatBox.querySelector('.close-chat');
        const messagesContainer = chatBox.querySelector('.chat-messages');
        const chatInput = chatBox.querySelector('input');
        const sendBtn = chatBox.querySelector('button');

        // Fonction d'affichage du chat
        function toggleChat() {
            if (chatBox.style.display === 'flex') {
                chatBox.style.display = 'none';
            } else {
                chatBox.style.display = 'flex';
            }
        }

        // Ajoute un message dans l'interface
        function addMessage(text, sender) {
            const msg = document.createElement('div');
            msg.className = 'message ' + sender;
            msg.textContent = text;
            messagesContainer.appendChild(msg);
            // Scroll vers le bas pour voir le dernier message
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Répond de manière basique en fonction de quelques mots clés
        function respond(text) {
            const m = text.toLowerCase();
            let response = "Merci pour votre message. Un membre de notre équipe vous contactera bientôt.";
            if (m.includes('service') || m.includes('services')) {
                response = "Nous proposons des services de développement de logiciels hébergés, d’architectures SaaS, de cybersécurité et de transformation numérique.";
            } else if (m.includes('contact')) {
                response = "Vous pouvez nous contacter au 06 59 92 47 52 ou par e-mail à contact.berryj@gmail.com.";
            } else if (m.includes('prix') || m.includes('tarif') || m.includes('devis')) {
                response = "Nos tarifs varient selon les projets. N’hésitez pas à nous transmettre votre demande pour un devis personnalisé.";
            }
            // Temporisation pour un effet plus naturel
            setTimeout(() => {
                addMessage(response, 'bot');
            }, 600);
        }

        // Envoyer un message
        function sendMessage() {
            const text = chatInput.value.trim();
            if (!text) return;
            addMessage(text, 'user');
            chatInput.value = '';
            respond(text);
        }

        // Gestion des événements
        chatButton.addEventListener('click', toggleChat);
        if (chatHeaderClose) {
            chatHeaderClose.addEventListener('click', () => {
                chatBox.style.display = 'none';
            });
        }
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});