// Service EmailJS pour envoyer les formulaires
import emailjs from 'emailjs-com'

// Configuration EmailJS - À remplacer par vos propres clés
// 1. Créez un compte sur https://www.emailjs.com/
// 2. Créez un service email (Gmail, Outlook, etc.)
// 3. Créez un template
// 4. Remplacez les valeurs ci-dessous

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_votre_service',     // Remplacez par votre Service ID
  TEMPLATE_ID_CONTACT: 'template_contact',  // Remplacez par votre Template ID pour contact
  TEMPLATE_ID_CV: 'template_cv',            // Remplacez par votre Template ID pour CV
  USER_ID: 'votre_user_id'                  // Remplacez par votre Public Key
}

// Initialiser EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.USER_ID)
}

// Envoyer le formulaire de contact
export const sendContactEmail = async (data: {
  nom: string
  prenom: string
  email: string
  telephone: string
  type: string
  departement: string
  message: string
}) => {
  const templateParams = {
    from_name: `${data.prenom} ${data.nom}`,
    from_email: data.email,
    telephone: data.telephone || 'Non renseigné',
    type_personne: data.type,
    departement: data.departement,
    message: data.message,
    to_email: 'contact@interimprobtp.ma'
  }

  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID_CONTACT,
    templateParams
  )
}

// Envoyer le formulaire CV
export const sendCVEmail = async (data: {
  nom: string
  email: string
  telephone: string
  cv_filename: string
}) => {
  const templateParams = {
    from_name: data.nom,
    from_email: data.email,
    telephone: data.telephone || 'Non renseigné',
    cv_filename: data.cv_filename,
    to_email: 'cv@interimprobtp.ma'
  }

  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID_CV,
    templateParams
  )
}
