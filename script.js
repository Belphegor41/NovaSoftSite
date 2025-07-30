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

        // Clé API pour l'assistant IA. Remplacez 'YOUR_API_KEY_HERE' par votre clé OpenAI personnelle.
        const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';

        /**
         * Fonction asynchrone qui interroge l'API OpenAI pour obtenir une réponse
         * en utilisant le modèle ChatGPT. Cette fonction nécessite une clé API valide.
         * @param {string} userMessage Le message saisi par l'utilisateur.
         * @returns {Promise<string>} La réponse générée par l'IA.
         */
        async function fetchAIResponse(userMessage) {
            try {
                const res = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            { role: 'system', content: 'Vous êtes l’assistant virtuel de NovaSoft. Répondez de manière professionnelle et concise aux questions concernant les services, la société, les tarifs et les demandes de contact.' },
                            { role: 'user', content: userMessage }
                        ],
                        max_tokens: 150,
                        temperature: 0.7
                    })
                });
                const data = await res.json();
                if (data && data.choices && data.choices.length > 0) {
                    return data.choices[0].message.content.trim();
                }
                return "Je n'ai pas compris votre demande, pourriez-vous reformuler ?";
            } catch (error) {
                console.error('Erreur lors de la requête à OpenAI :', error);
                return "Désolé, une erreur est survenue lors du traitement de votre demande.";
            }
        }

        // Répondre en appelant l'API ou, à défaut, en fournissant une réponse simple
        async function respond(text) {
            if (OPENAI_API_KEY && OPENAI_API_KEY !== 'YOUR_API_KEY_HERE') {
                // Utiliser l'IA si une clé API valide est configurée
                const aiReply = await fetchAIResponse(text);
                addMessage(aiReply, 'bot');
            } else {
                // Fallback simple si aucune clé n'est configurée
                const m = text.toLowerCase();
                let response = "Merci pour votre message. Un membre de notre équipe vous contactera bientôt.";
                if (m.includes('service') || m.includes('services')) {
                    response = "Nous proposons des services de développement de logiciels hébergés, d’architectures SaaS, de cybersécurité et de transformation numérique.";
                } else if (m.includes('contact')) {
                    response = "Vous pouvez nous contacter au 06 59 92 47 52 ou par e-mail à contact.berryj@gmail.com.";
                } else if (m.includes('prix') || m.includes('tarif') || m.includes('devis')) {
                    response = "Nos tarifs varient selon les projets. N’hésitez pas à nous transmettre votre demande pour un devis personnalisé.";
                }
                setTimeout(() => {
                    addMessage(response, 'bot');
                }, 600);
            }
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