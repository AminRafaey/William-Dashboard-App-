// GET TOTAL POST COUNT

import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase()
        const postCount = await db.collection('posts').countDocuments()
        res.status(200).json(postCount)
    }
    catch (error) {
        res.status(500).json({ error })
        console.log('error: ',error)
    }

}