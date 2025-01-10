export const ticketTypes = {
    BUG: 'bug',
    FEATURE: 'feature',
    SUPPORT: 'support',
    TECHNICAL: 'technical'
};

export const ticketGenerator = {
    actors: ['Utilisateur', 'Admin', 'Client', 'Manager', 'Développeur'],
    actions: {
        bug: ['ne peut pas accéder à', 'rencontre une erreur sur', 'voit un bug dans', 'est bloqué sur'],
        feature: ['souhaite pouvoir', 'aimerait avoir', 'demande à pouvoir', 'propose d\'ajouter'],
        support: ['demande comment', 'a besoin d\'aide pour', 'cherche à comprendre', 'souhaite savoir'],
        technical: ['signale des lenteurs sur', 'remarque des timeouts sur', 'observe des erreurs dans', 'note des problèmes de performance sur']
    },
    contexts: ['le dashboard', 'la page de profil', 'le système de login', 'les rapports', 'la gestion des utilisateurs', 'l\'interface d\'administration'],
    values: ['pour gagner du temps', 'pour améliorer la productivité', 'pour une meilleure expérience', 'car c\'est crucial pour son travail'],
    problems: ['ça ne répond pas', 'ça plante régulièrement', 'l\'interface est confuse', 'les données sont incorrectes']
};

export const generateTicket = () => {
    const actor = ticketGenerator.actors[Math.floor(Math.random() * ticketGenerator.actors.length)];
    const type = Object.keys(ticketTypes)[Math.floor(Math.random() * Object.keys(ticketTypes).length)];
    const context = ticketGenerator.contexts[Math.floor(Math.random() * ticketGenerator.contexts.length)];
    const value = ticketGenerator.values[Math.floor(Math.random() * ticketGenerator.values.length)];
    const actions = ticketGenerator.actions[type.toLowerCase()];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const problem = ticketGenerator.problems[Math.floor(Math.random() * ticketGenerator.problems.length)];

    let text = '';
    switch(type) {
        case 'BUG':
            text = `${actor} ${action} ${context} : ${problem}`;
            break;
        case 'FEATURE':
            text = `${actor} ${action} ${context} ${value}`;
            break;
        case 'SUPPORT':
            text = `${actor} ${action} ${context}`;
            break;
        case 'TECHNICAL':
            text = `${actor} ${action} ${context}`;
            break;
        default:
            text = `${actor} ${action} ${context}`;
    }

    return {
        text,
        type: ticketTypes[type],
        ambiguous: Math.random() > 0.7,
        complexity: Math.floor(Math.random() * 5) + 1
    };
};