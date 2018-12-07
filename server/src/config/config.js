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
                expiresIn: "5m"
            },
            refresh: {
                type: 'refresh',
                expiresIn: '48h'
            }
        }

    },
    ROLEs: ['USER', 'ADMIN']
}
