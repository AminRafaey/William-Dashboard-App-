import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase()
        const usersPreviousCount = req.body.usersPreviousCount
        const filter = {};
        const updateDoc = {
            $set: {
                usersPreviousCount: usersPreviousCount
            },
        };
        const options = { upsert: true }; // Create the record if it does not exist
        await db.collection('dashboard').updateOne(filter,updateDoc, options)
        res.status(200).json({ success: true })
    }
    catch (error) {
        res.status(500).json({ error: error })
    }

}