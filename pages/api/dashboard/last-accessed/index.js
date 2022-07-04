import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        console.log('updating last accessed')
        const { db } = await connectToDatabase()
        const date = Date.now()
        const updateDoc = {
            $set: {
                lastAccessed: date
            },
        };
        const options = { upsert: true }; // Create the record if it does not exist
        const filter = {};
        await db.collection('dashboard').updateOne(filter,updateDoc, options)
        res.status(200).json({ success: true })
    }
    catch (error) {
        res.status(500).json({ error: error })
    }

}