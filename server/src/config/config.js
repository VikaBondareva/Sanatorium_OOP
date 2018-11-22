module.exports={
    port: 8081,
    dbURL: 'mongodb://localhost/sanatorium',
    dbOptions: {useMogeClient: true},
    authentication:{
        jwtSecret: process.env.JWT_SECRET || 'secret',
        secret: "some-secret-shit-goes-here",
        refreshTokenSecret: "some-secret-refresh-token-shit",
        tokenLife: 900,
        refreshTokenLife: 86400
    },
    ROLEs : ['USER', 'ADMIN']
}

