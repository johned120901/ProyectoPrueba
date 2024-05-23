
const cells_properties = {
    enableLitElement: true,
    onlyLitElements: true,
    initialTemplate: 'login',
    transpile: true,
    transpileExclude: ['webcomponentsjs', 'moment', 'd3', 'bgadp*'],
    buildTargets: [
        'last 5 Chrome versions',
        'last 8 Android versions',
        'last 8 Safari versions'
    ],
    debug: true,
    logs: false,

    /**
     * Relative path to folder that contains dynamic pages (.json files)
     */
    templatesPath: './dynamicPages/',
    /**
     * Relative path to folder that contains static pages (.js files)
     */
    pagesPath: './pages/',
    prplLevel: 1,
    initialBundle: ['login'],

    /* Internationalization options */
    locales: {
        languages: [],
        intlInputFileNames: ['locales'],
        intlFileName: 'locales',
    },

    pages: [
        'login',
        'list-cards',
        'card-detail'
    ],

    navigationPages: {
        loginPage: 'login',
        listCards: 'list-cards',
        cardDetail: 'card-detail'
    },

    channels: {
        cardDetail: 'card-detail-channel',
        ambient: 'ambient-channel'
    }
}

module.exports = cells_properties;