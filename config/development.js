module.exports = {
    log: {
        level: 'silly',
        disabled: false,
    },
    cors:{
        origins: ['http://localhost:3000','http://localhost:3001'],
        maxAge: 3*60*60,
    },
    initialezeDatabaseParameters:{
        alter: true,
        force: false,
    }
};
