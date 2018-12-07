module.exports = {
    port: 8081,
    dbURL: 'mongodb://localhost/sanatorium',
    dbOptions: {
        useMogeClient: true
    },
    jwt: {
        secret: 'some-secret-shit-goes-here',
        tokens: {
            access: {
                type: 'access',
                expiresIn: "2m"
            },
            refresh: {
                type: 'refresh',
                expiresIn: '1d'
            }
        }

    },
    ROLEs: ['USER', 'ADMIN']
}
