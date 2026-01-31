export const fr = {
  nav: {
    services: "Services",
    aboutUs: "À Propos de Nous",
    process: "Processus",
    contact: "Contact",
    startProject: "LANCER PROJET",
  },
  hero: {
    badge: "SYSTÈME OPÉRATIONNEL | v1.0",
    prefix: "L'Intersection entre",
    typingText: "Logique & Croissance",
    description: "Nous comblons le fossé entre code complexe et solutions numériques évolutives. Votre partenaire en Ingénierie Logicielle, IA et Architecture Cloud.",
    ctaPrimary: "Démarrer un Projet",
    ctaSecondary: "Explorer les Services",
    tech: {
      engineering: "INGÉNIERIE",
      ai: "CŒUR IA",
      cloud: "DONNÉES CLOUD"
    }
  },
  techStack: {
    label: "MODULES_SYSTÈME"
  },
  services: {
    title: "Capacités Techniques",
    subtitle: "Nous délivrons une ingénierie à haute valeur ajoutée sur tout le spectre numérique.",
    items: [
      {
        id: "software-development",
        title: "Développement Logiciel",
        slug: "developpement-logiciel",
        description: "Architecture de plateformes SaaS robustes, tableaux de bord interactifs et applications mobiles natives (React, Flutter, Node.js).",
        projects: [
          {
            id: "photo-studio-digitalization",
            name: "Digitalisation d'un Studio de Photographie",
            description: "La Casa de Selfie est une plateforme digitale complète conçue pour moderniser et optimiser la gestion des services d’un studio de photographie, offrant une expérience fluide pour les clients et l'équipe administrative via une solution web et mobile.",
            longDescription: "Ce projet a impliqué la création d'une plateforme numérique complète pour un studio de photographie, incluant des solutions web et mobiles. Les principales fonctionnalités comprennent la gestion des clients, la réservation en ligne, l'intégration de galeries photo et des outils administratifs. L'objectif était de rationaliser les opérations et d'améliorer l'expérience client grâce à des interfaces numériques modernes. Nous avons utilisé Laravel pour le backend, React Native pour l'application mobile, et intégré diverses API pour le traitement des paiements et la manipulation d'images.",
            image: "/casa_de_selfie.png",
            images: [
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+Digitalisation+1",
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+Digitalisation+2",
            ],
            video: "https://www.youtube.com/embed/your_video_id_1",
            demoLink: "https://demo.casadeselfie.com",
            githubLink: "https://github.com/nexura/casadeselfie",
            tags: ["Laravel", "React Native", "Node.js", "PayPal API", "BgRemover API", "MySQL", "Bootstrap", "Git"],
          },
          {
            id: "job-search-web-app",
            name: "Application Web de Recherche d’Emploi",
            description: "Cette application web, développée avec Spring Boot, offre une plateforme centralisée permettant aux ingénieurs de rechercher des opportunités d’emploi et aux employeurs de publier des offres et des formations. L'application inclut un système de profils personnalisés, une gestion des candidatures et un tableau de bord administrateur, avec un accent mis sur l'expérience utilisateur, la sécurité et la performance.",
            longDescription: "Une application web robuste construite avec Spring Boot, permettant aux ingénieurs de trouver des emplois et aux entreprises de publier des annonces et des programmes de formation. Les fonctionnalités incluent des profils d'utilisateurs, le suivi des candidatures et un tableau de bord administrateur. Le développement a priorisé l'expérience utilisateur, la sécurité et la performance, assurant une plateforme fluide et efficace pour les chercheurs d'emploi et les employeurs.",
            image: "/CarrièreX.png",
            images: [
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+Emploi+1",
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+Emploi+2",
            ],
            video: "https://www.youtube.com/embed/your_video_id_2",
            demoLink: "https://demo.rechercheemploi.com",
            githubLink: "https://github.com/nexura/apprechercheemploi",
            tags: ["Spring Boot", "Spring Data JPA", "Spring MVC", "MySQL", "Thymeleaf", "Bootstrap", "Git"],
          },
          {
            id: "mobile-pos-restaurants",
            name: "Application Mobile POS pour Restaurants",
            description: "Une application mobile POS conçue pour permettre aux restaurants de gérer leurs opérations en temps réel, incluant la prise de commandes, la gestion des tables et la synchronisation automatique pour piloter le service efficacement.",
            longDescription: "Cette application mobile Point-de-Vente (POS) a été développée pour les restaurants afin de rationaliser leurs opérations. Elle permet la prise de commandes en temps réel, une gestion efficace des tables et une synchronisation automatique entre les appareils. L'application a été construite avec React Native pour une compatibilité multiplateforme, assurant une expérience fluide pour le personnel du restaurant.",
            image: "https://placehold.co/600x400/00d7d7/020617?text=App+Mobile+POS",
            images: [
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+POS+1",
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+POS+2",
            ],
            video: "https://www.youtube.com/embed/your_video_id_3",
            demoLink: "https://demo.mobilepos.com",
            githubLink: "https://github.com/nexura/appmobilepos",
            tags: ["React Native", "Node.js", "Redux", "Redux-Saga", "RealmDB", "Android Studio"],
          },
          {
            id: "studio-app-user",
            name: "Application Studio Photo",
            description: "Développement d'une application pour la partie utilisateur d'un studio photo, permettant la gestion des photos, la réservation de séances, l'accès à des services personnalisés. Cette application vise à offrir une expérience client fluide et moderne.",
            longDescription: "Une application sur mesure pour les clients de studio photo, offrant des fonctionnalités telles que la gestion de la galerie photo personnelle, la réservation facile de séances et l'accès à des services personnalisés exclusifs. L'application se concentre sur une expérience utilisateur intuitive et moderne pour améliorer l'engagement et la satisfaction des clients.",
            image: "/studio.jpg",
            images: [
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+Studio+1",
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+Studio+2",
            ],
            video: "https://www.youtube.com/embed/your_video_id_4",
            demoLink: "https://demo.appstudio.com",
            githubLink: "https://github.com/nexura/appstudiophoto",
            tags: ["WordPress", "PHP", "MySQL", "JavaScript", "HTML", "CSS"],
          },
        ],
      },
      {
        id: "ai-automation",
        title: "IA & Automatisation",
        slug: "ia-automatisation",
        description: "Intégration de LLMs pour chatbots intelligents et automatisation de flux répétitifs via Zapier, Make et Python.",
        projects: [
          {
            id: "emotion-recognition-system",
            name: "Système de Reconnaissance d’Émotions",
            description: "Ce projet consiste en un système intelligent capable d’identifier et de classifier les émotions humaines à partir d’images ou d’un flux vidéo en temps réel. Utilisant des techniques avancées de Deep Learning, le modèle analyse les expressions faciales et prédit des émotions telles que : 😊 Joie — 😐 Neutre — 😠 Colère — 😢 Tristesse — 😲 Surprise — 😨 Peur — 😴 Fatigue. Ce projet met en avant le traitement d’images, l'analyse des visages, le Machine Learning appliqué et une interface graphique simple mais performante.",
            longDescription: "Un système avancé de reconnaissance des émotions exploitant le Deep Learning pour détecter et classifier les émotions humaines à partir de flux vidéo en direct ou d'images statiques. Le système identifie une gamme d'émotions, notamment la joie, la neutralité, la colère, la tristesse, la surprise, la peur et la fatigue en analysant les expressions faciales. Ce projet démontre de solides capacités en traitement d'images en temps réel, déploiement de modèles d'apprentissage automatique et conception d'interfaces conviviales.",
            image: "/emotion-recognition.jpg",
            images: [
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+Emotion+1",
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+Emotion+2",
            ],
            video: "https://www.youtube.com/embed/your_video_id_5",
            demoLink: "https://demo.reconnaissanceemotions.com",
            githubLink: "https://github.com/FatiMjimer/Emotion_recongnition",
            tags: ["Python", "TensorFlow", "OpenCV", "NumPy", "Matplotlib", "Scikit-learn", "Jupyter Notebook", "Tkinter", "Git"],
          },
        ],
      },
      {
        id: "cloud-security",
        title: "Cloud & Sécurité",
        slug: "cloud-securite",
        description: "Conception d'infrastructures évolutives sur AWS/Azure, optimisation des performances et audits de sécurité rigoureux.",
        projects: [
          {
            id: "project-delta",
            name: "Projet Delta",
            description: "Une infrastructure cloud sécurisée et évolutive pour une startup fintech.",
            longDescription: "Développement d'une infrastructure cloud hautement sécurisée et évolutive sur AWS pour une startup fintech à croissance rapide. Le projet s'est concentré sur l'intégrité des données, la conformité aux réglementations financières et l'optimisation des performances pour les transactions à forte charge. Mise en œuvre de mesures de sécurité avancées, de pipelines de déploiement automatisés et d'une surveillance continue pour des opérations robustes.",
            image: "https://placehold.co/600x400/00d7d7/020617?text=Projet+Delta",
            images: [
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+CloudSec+1",
              "https://placehold.co/1200x800/00d7d7/020617?text=Projet+CloudSec+2",
            ],
            video: "https://www.youtube.com/embed/your_video_id_6",
            demoLink: "https://demo.cloudsecurite.com",
            githubLink: "https://github.com/nexura/cloudfintech",
            tags: ["AWS", "DevOps", "Sécurité"],
          },
        ],
      },
    ],
    moreServicesButton: "Plus de Services"
  },
  industries: {
    title: "Industries Servies",
    subtitle: "Expertise verticale pour des marchés spécialisés.",
    items: [
      { name: "FinTech", desc: "Trading haute fréquence & registres sécurisés" },
      { name: "HealthTech", desc: "Systèmes de données patients conformes" },
      { name: "Logistique", desc: "Suivi de flotte temps réel & optimisation" },
      { name: "E-Commerce", desc: "Boutiques headless à grande échelle" },
      { name: "Immobilier", desc: "Visites virtuelles & gestion locative" },
      { name: "EdTech", desc: "Systèmes de gestion d'apprentissage interactifs" }
    ]
  },
  aboutUs: {
    title: "Plus que du Code",
    highlight: "Ingénierie Stratégique.",
    description: "Nexura est une Agence-Architecte. Nous apportons la rigueur de l'ingénierie d'État à l'agilité du monde numérique. Nous ne faisons pas que coder ; nous concevons des systèmes évolutifs qui créent de la valeur.",
    points: [
      "Précision Architecturale & Scalabilité",
      "Approche ROI Business-First",
      "Exécution Agile avec Contrôle Qualité Premium",
      "Capacités d'Intégration IA Avancées"
    ],
    readMoreButton: "En Savoir Plus",
    systemStatus: "nexura.system.about_module",
    titlePrefix: "Plus que",
    titleHighlight: "du simple Code.",
    startInnovation: "Lancer l'Innovation",
    philosophy: "Notre Philosophie",
    scrollExplore: "Défiler pour Explorer",
    features: [
      { title: "Ingénierie D'abord", desc: "Qualité de code rigoureuse et patterns architecturaux." },
      { title: "Intégration IA", desc: "Systèmes intelligents qui apprennent et s'adaptent à vos données." },
      { title: "Échelle Globale", desc: "Infrastructure bâtie pour gérer des millions de requêtes." }
    ],
    mockCode: {
      buildSuccess: "BUILD SUCCÈS",
      optimizedBy: "Optimisé par Nexura Engine"
    },
    exploreTech: "Explorer Capacités Techniques",
    viewTechStack: "Voir Notre Stack Technique",
    extendedDescription: "Nexura est une agence d'ingénierie logicielle de pointe dédiée à transformer les idées innovantes en solutions numériques robustes, évolutives et performantes. Avec une expertise approfondie dans les technologies de pointe telles que l'IA, l'architecture cloud et les frameworks web modernes, nous nous associons aux entreprises pour naviguer dans les complexités du paysage numérique et atteindre leurs objectifs stratégiques. Notre approche combine des principes d'ingénierie rigoureux avec des méthodologies agiles, garantissant des cycles de développement rapides, une qualité exceptionnelle et un impact commercial mesurable.",
    servicesOverview: "Nos services principaux englobent le développement logiciel complet, des applications web et mobiles sur mesure aux plateformes SaaS de niveau entreprise. Nous sommes spécialisés dans l'intégration de l'IA, en tirant parti de l'apprentissage automatique et de l'automatisation intelligente pour créer des systèmes intelligents et efficaces. De plus, notre expertise en architecture cloud garantit que votre infrastructure est sécurisée, évolutive et optimisée pour des performances optimales.",
    missionTitle: "Notre Mission",
    missionDescription: "Chez Nexura, notre mission est de donner aux entreprises les moyens de l'ingénierie logicielle innovante. Nous élaborons des solutions numériques sur mesure qui favorisent l'efficacité, stimulent la croissance et redéfinissent les standards de l'industrie.",
    coreServicesTitle: "Nos Services Principaux",
    ctaTitle: "Prêt à Transformer Votre Entreprise ?",
    ctaDescription: "Associez-vous à Nexura pour construire des solutions innovantes qui propulseront votre succès à l'ère numérique.",
    ctaButton: "Nous Contacter"
  },
  process: {
    label: "MÉTHODOLOGIE",
    title: "Le Modèle",
    highlight: "Agence-Architecte",
    description: "Nous combinons la profondeur stratégique d'un cabinet de conseil avec la vitesse d'exécution d'un réseau mondial de développeurs.",
    steps: [
      {
        title: "Découverte",
        subtitle: "ANALYSE SYSTÈME",
        description: "Immersion dans votre logique métier, évaluation de la dette technique et cartographie des besoins d'évolution.",
      },
      {
        title: "Architecture",
        subtitle: "CONCEPTION",
        description: "Design de la structure squelettique. Nous définissons les microservices, les schémas de données et l'infrastructure cloud.",
      },
      {
        title: "Exécution",
        subtitle: "DÉVELOPPEMENT",
        description: "Développement haute vélocité via notre réseau d'experts, sous la supervision stricte de nos leads internes.",
      },
      {
        title: "Qualité",
        subtitle: "STRESS TESTING",
        description: "Audits de sécurité de bout en bout, pipelines de tests automatisés et optimisation des goulots d'étranglement.",
      },
      {
        title: "Lancement",
        subtitle: "DÉPLOIEMENT",
        description: "Déploiement CI/CD sans interruption et transition vers notre écosystème de support technique long terme.",
      }
    ],
    tags: {
      engineers: "Ingénieurs Pilotés",
      architect: "Supervision Architecte"
    }
  },
  testimonials: {
    title: "Impact & Validation",
    subtitle: "Résultats concrets de partenaires qui font confiance à notre précision technique.",
    satisfaction: "Satisfaction Client : 100%",
    items: [
      {
        quote: "L'architecture de Nexura a transformé notre système legacy en un moteur haute performance. Les flux automatisés nous ont fait gagner 20h/semaine par employé.",
        role: "COO, Chaîne Logistique",
        metric: "+40% Efficacité"
      },
      {
        quote: "Il nous fallait un MVP en 8 semaines. Nexura a livré un produit scalable en 6, avec une qualité de code validée sans faute par l'audit de Série A.",
        role: "Fondatrice, FinTech",
        metric: "Levée de Fonds Sécurisée"
      },
      {
        quote: "Leur intégration IA ne se contente pas de répondre ; elle analyse nos données pour prédire les tendances. Une véritable intelligence de niveau ingénieur.",
        role: "CTO, Groupe Retail",
        metric: "99.9% Précision"
      }
    ]
  },
  contact: {
    status: "ÉTAT SYSTÈME : EN LIGNE",
    title: "Initialiser",
    highlight: "Connexion",
    description: "Prêt à ingénier votre futur ? Nos architectes sont prêts à analyser vos besoins et proposer une solution évolutive.",
    info: {
      emailLabel: "Canal de Communication",
      locationLabel: "Base d'Opérations",
      location: "Casablanca, Maroc",
      remote: "Capacités Globales (Remote)",
      timeLabel: "Temps de Réponse",
      time: "Typiquement sous 24 heures"
    },
    form: {
      successTitle: "Transmission Reçue",
      successMsg: "Vos coordonnées de projet ont été enregistrées. En attente de contact ingénieur.",
      reset: "Nouvelle transmission_",
      nameLabel: "// NOM_COMPLET",
      emailLabel: "// ADRESSE_EMAIL",
      typeLabel: "// SÉLECTION_PROTOCOLE",
      msgLabel: "// DONNÉES_ENTRÉE",
      btn: "INITIER TRANSMISSION",
      placeholders: {
        name: "Jean Dupont",
        email: "nom@entreprise.com",
        msg: "Décrivez vos objectifs..."
      },
      types: [
        "Développement Logiciel",
        "IA & Automatisation",
        "Infrastructure Cloud",
        "Conseil / Audit"
      ]
    }
  },
  footer: {
    tagline: "Ingénierie du futur des affaires numériques. Nous construisons les systèmes qui propulsent votre croissance.",
    headers: {
      sitemap: "Plan du Site",
      legal: "Légal"
    },
    links: {
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation"
    },
    rights: "Tous droits réservés.",
    builtBy: "Conçu & Développé par Nexura Engineering"
  },
  serviceDetailPage: {
    backToServices: "Retour aux Services",
    relatedProjects: "Projets Connexes",
    serviceNotFound: "",
    serviceNotFoundMessage: "",
    caseStudy: "Étude de Cas",
    ourPortfolio: "Notre Portfolio",
    liveDemo: "Démo en direct",
    githubRepo: "Dépôt GitHub",
    screenshots: "Captures d'écran",
    projectDetails: "Détails du projet"
  }
};
