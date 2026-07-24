/* ==========================================================================
   MS GROUP — contact.js
   Validation du formulaire de contact + simulation d'envoi
   (Sans backend : à connecter plus tard à Firebase / Formspree si besoin)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successBox = document.getElementById('form-success');
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');

  const fields = {
    nom: form.querySelector('#nom'),
    email: form.querySelector('#email'),
    telephone: form.querySelector('#telephone'),
    sujet: form.querySelector('#sujet'),
    message: form.querySelector('#message'),
  };

  function showError(field, message) {
    const group = field.closest('.form-group');
    group.classList.add('error');
    const errorEl = group.querySelector('.error-msg');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(field) {
    const group = field.closest('.form-group');
    group.classList.remove('error');
    const errorEl = group.querySelector('.error-msg');
    if (errorEl) errorEl.textContent = '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm() {
    let isValid = true;

    // Nom complet
    if (!fields.nom.value.trim()) {
      showError(fields.nom, 'Veuillez indiquer votre nom complet.');
      isValid = false;
    } else {
      clearError(fields.nom);
    }

    // Email
    if (!fields.email.value.trim()) {
      showError(fields.email, 'Veuillez indiquer votre adresse email.');
      isValid = false;
    } else if (!isValidEmail(fields.email.value.trim())) {
      showError(fields.email, 'Adresse email invalide.');
      isValid = false;
    } else {
      clearError(fields.email);
    }

    // Téléphone (optionnel mais si rempli, contrôle basique)
    if (fields.telephone.value.trim() && fields.telephone.value.trim().length < 6) {
      showError(fields.telephone, 'Numéro de téléphone invalide.');
      isValid = false;
    } else {
      clearError(fields.telephone);
    }

    // Sujet
    if (!fields.sujet.value) {
      showError(fields.sujet, 'Veuillez choisir un sujet.');
      isValid = false;
    } else {
      clearError(fields.sujet);
    }

    // Message
    if (!fields.message.value.trim()) {
      showError(fields.message, 'Veuillez décrire votre projet ou besoin.');
      isValid = false;
    } else if (fields.message.value.trim().length < 10) {
      showError(fields.message, 'Votre message est trop court (10 caractères minimum).');
      isValid = false;
    } else {
      clearError(fields.message);
    }

    return isValid;
  }

  // Effacer l'erreur dès que l'utilisateur corrige le champ
  Object.values(fields).forEach((field) => {
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successBox.classList.remove('show');
    successBox.textContent = '';

    if (!validateForm()) return;

    // Simulation d'un envoi (à remplacer par un appel Firebase/Formspree)
    submitBtn.disabled = true;
    btnText.textContent = 'Envoi en cours...';
    btnSpinner.style.display = 'inline-block';

    const payload = {
      nom: fields.nom.value.trim(),
      email: fields.email.value.trim(),
      telephone: fields.telephone.value.trim(),
      sujet: fields.sujet.value,
      message: fields.message.value.trim(),
      date: new Date().toISOString(),
    };

    // Exemple d'intégration future avec Firebase Firestore :
    //
    // firebase.firestore().collection('messages').add(payload)
    //   .then(() => { ... })
    //   .catch((err) => { ... });
    //
    // Pour le moment, on simule un délai réseau :
    setTimeout(() => {
      console.log('Message MS GROUP prêt à être envoyé :', payload);

      submitBtn.disabled = false;
      btnText.textContent = 'Envoyer le message';
      btnSpinner.style.display = 'none';

      successBox.textContent = '✅ Merci ! Votre message a bien été envoyé. Notre équipe vous recontactera très rapidement.';
      successBox.classList.add('show');

      form.reset();
    }, 1200);
  });
});
