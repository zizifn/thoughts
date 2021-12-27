import { config } from 'dotenv';
import { MongoClient} from 'mongodb'

config();

async function main() {
    const client = await MongoClient.connect(process.env.MONGO_DB_URL).then(client => {
        console.log("Connected successfully to server");
        return client;
    });
    await client.db().admin().listDatabases().then(dbs =>{
        console.log(dbs);
    });
    await client.close();
}

main()