const {MongoClient} = require('mongodb');
const url = "mongodb://0.0.0.0:27017";
const cardDatabase= "card_dashbord";
const clientConnect = new MongoClient(url);

async function dbConnect(){
    try {
        const result = await clientConnect.connect();
        return result.db(cardDatabase);
    } catch (error) {
        return "Error in connection" + error;
    }
}
module.exports= {dbConnect}; 