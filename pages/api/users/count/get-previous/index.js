// GET PREVIOUS USER COUNT - not used

import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase()
        const filter = {}
        const options = {
            projection: { usersPreviousCount: 1 },
        };
        const previousUserCount = await db.collection('dashboard').findOne(filter, options)
        res.status(200).json(previousUserCount)
    }
    catch (error) {
        res.status(500).json({ error: error })
    }

}