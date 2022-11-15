/* eslint-disable import/no-anonymous-default-export */
export default {
  translation: {
    // Headers
    'app.title': 'VYTC',
    'app.title.extras': '- Videos and Youtube Converter',

    // Login page
    'app.login.placeholder.password': 'Mot de passe...',
    'app.login.btn': 'Connexion',
    'app.login.err.password_required': 'Le mot de passe est obligatoire, veuillez spécifier une valeur valide !',

    // Lookup page
    'app.lookup.btn': 'Chercher',
    'app.lookup.description':
      "Téléchargez n'importe quelle vidéo youtube au format audio ou video. Tout ce que vous avez à faire est de copier le lien dans la case ci-dessous.",
    'app.lookup.err.value_required': 'Entrée invalide, Veuillez spécifier un URL Youtube valide et réessayer !',
    'app.lookup.err.invalid_url': "L'url que vous avez entré n'est pas valide, veuillez réessayer avec une valeur valide !",

    // Download Page
    'app.download.header.popup.video.title': 'Titre',
    'app.download.header.video_quality': 'Qualité',
    'app.download.header.video_quality.highest': 'Haute qualité',
    'app.download.header.video_quality.default': 'Moyenne',
    'app.download.header.video_quality.lowest': 'Faible qualité',
    'app.download.header.popup.video_quality.label': 'Plus la qualité est élevée, plus la conversion et le téléchargement seront longs !',

    'app.download.convert': 'TÉLÉCHARGER',
    'app.download.convert.audio': 'AUDIO',
    'app.download.convert.video': 'VIDÉO',

    'app.download.progress.btn': 'Annuler',

    'app.download.download': 'Votre téléchargement va démarrer automatiquement, veuillez patienter...',
    'app.download.download.btn': 'Terminer',

    // Not Found page
    'app.page.not_found.title': 'Oh non!!',
    'app.page.not_found.subtitle': "Soit vous avez mal orthographié l'URL.",
    'app.page.not_found.subtitle_2': "Soit vous demandez une page qui n'existe plus.",
    'app.page.not_found.back_btn': "Page d'accueil",

    // Websocket - From Server
    'ws.success': 'Succès',
    'ws.err.fields_required': 'Un ou plusieurs champs sont obligatoires !',

    'ws.err.connection_error':
      'Erreur de connexion. Impossible de se connecter au serveur, veuillez patienter et essayer de vous connecter à nouveau !',
    'ws.err.connection_closed':
      'Déconnecté. La connexion a expiré ou le serveur a fermé la connexion, veuillez patienter et essayer de vous connecter à nouveau !',
    'ws.err.connection_lost': 'La connexion au serveur a été perdue, tentatives de reconnexion...',

    'ws.downloading': 'Configuration...',
    'ws.fetching.video': 'Récupération de la vidéo depuis youtube...',
    'ws.fetching.details': 'Récupération des détails de la vidéo...',
    'ws.err.fetching.unexpected_error': "Une erreur s'est produite lors du téléchargement de la vidéo. Veuillez rafraîchir la page et réessayer.",

    'ws.converting': 'Conversion...',
    'ws.err.converting': "Une erreur s'est produite lors de la conversion de la vidéo. Veuillez rafraîchir la page et réessayer.",

    'ws.setting_up_file': 'Configuration des fichiers...',
    'ws.err.setting_up_file': "Une erreur s'est produite lors de la configuration des fichiers. Veuillez rafraîchir la page et réessayer.",

    'ws.saving': 'Enregistrement en cours...',
    'ws.error.unhandled': 'Erreur non prise en charge!',
    'ws.error.unhandled_desc': "Une erreur s'est produite lors du traitement de votre demande !",

    // App Errors
    'app.err.unhandled_error.title': 'Erreur non prise en charge!',
    'app.err.unhandled_error.desc':
      "Une erreur s'est produite lors du traitement de votre demande. Veuillez recharger la page, et si le problème persiste, veuillez contacter l'équipe !",

    // Api Errors
    'api.err.security.invalid_passphrase': 'Mot de passe invalide !',
    'api.err.worker.invalid_url': "L'url que vous avez entré n'est pas valide, veuillez réessayer avec une valeur valide !",
    'api.err.validation': 'Mot de passe incorrect, Veuillez vérifier que vous avez spécifié un mot de passe valide et réessayez!',
    'api.err.unexpected_error':
      'An error occurred while trying to handle your request. Please reload the page and if the problem persists, contact the team!',
  },
};
