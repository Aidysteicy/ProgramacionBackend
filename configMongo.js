const mongodb = {
    cnxStr: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       // useCreateIndex: true,
        //serverSelectionTimeoutMS: 5000,
    }
}
module.exports = mongodb