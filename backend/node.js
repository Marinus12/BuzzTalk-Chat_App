import { MongoClient } from 'mongodb';

async function connectToMongoDB() {
    const uri = 'mongodb+srv://akumchaevodia:meldiah75@cluster0.s5yi7.mongodb.net/';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

connectToMongoDB().catch(console.error);
