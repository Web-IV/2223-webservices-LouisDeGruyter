module.exports = {
    log: {
        level: 'silly',
        disabled: true,
    },
    cors:{
        origins: ['http://localhost:3000'],
        maxAge: 3*60*60,
    },
    initialezeDatabaseParameters:{
        force: true,
        alter: false,
    }
};
