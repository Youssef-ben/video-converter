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

    // Preview Page
    'app.preview.convert': 'TÉLÉCHARGER',
    'app.preview.convert.audio': 'AUDIO',
    'app.preview.convert.video': 'VIDÉO',
    'app.preview.auto_download': 'Votre téléchargement va démarrer automatiquement, veuillez patienter...',
    'app.preview.video_quality': 'Qualité',
    'app.preview.video_quality.highest': 'Haute qualité',
    'app.preview.video_quality.default': 'Moyenne',
    'app.preview.video_quality.lowest': 'Faible qualité',
    'app.preview.video_quality.label': 'NOTE : Plus la qualité est élevée, plus la conversion et le téléchargement seront longs !',

    // Not Found page
    'app.page.not_found.title': 'Oh non!!',
    'app.page.not_found.subtitle': "Soit vous avez mal orthographié l'URL.",
    'app.page.not_found.subtitle_2': "Soit vous demandez une page qui n'existe plus.",
    'app.page.not_found.back_btn': "Page d'accueil",

    // App Errors
    'app.err.unhandled_error':
      "Une erreur s'est produite lors du traitement de votre demande. Veuillez recharger la page, et si le problème persiste, veuillez contacter l'équipe !",

    // Api Errors
    'api.err.validation': 'Mot de passe incorrect, Veuillez vérifier que vous avez spécifié un mot de passe valide et réessayez!',
    'api.err.worker.invalid_url': "L'url que vous avez entré n'est pas valide, veuillez réessayer avec une valeur valide !",

    // TODO: Deleted everything after this line.
    //-------------------------------------------------------------------------------------------
    // Youtube downloader page
    'app.yt.title': 'Téléchargeur Youtube',
    'app.yt.btn.search': 'Chercher',
    'app.yt.video_preview.description':
      'Hooray!! nous avons trouvé la vidéo que vous recherchez. Veuillez choisir le format de fichier que vous souhaitez télécharger.',
    'app.yt.video_preview.title_name': '(Facultatif) - Utilisez la case ci-dessous pour renommer la vidéo.',
    'app.yt.err.invalid_url_msg': "L'url que vous avez entré n'est pas valide, veuillez réessayer avec une valeur valide !",
    'app.yt.video_preview.video_quality': 'Qualité vidéo',
    'app.highest': 'Haute qualité',
    'app.default': 'Moyenne',
    'app.lowest': 'Faible qualité',

    // Server Messages/Error.
    'api.err.unexpected_error':
      "Une erreur inattendue s'est produite lors du traitement de votre demande. Veuillez contacter l'équipe si le problème persiste !",

    'api.err.security.unauthorized': 'Non autorisé',
    'api.err.security.unauthorized_desc':
      "Informations d'identification invalides ou vous n'avez pas la permission d'accéder aux ressources demandées !",

    // Login
    'api.err.downloader.invalid_url': 'Invalid Youtube URL!',
    'api.err.downloader.invalid_url_desc': 'Please review the Youtube URL and try again!',

    'ws.err.connection_lost': 'La connexion au serveur a été perdue, tentatives de reconnexion...',
    'ws.success': 'Succès',
    'ws.err.fields_required': 'Un ou plusieurs champs sont obligatoires !',

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
  },
};
