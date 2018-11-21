module.exports={
    port: 8081,
    dbURL: 'mongodb://localhost/sanatorium',
    dbOptions: {useMogeClient: true},
    authentication:{
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}

