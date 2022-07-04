import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const userId = req.query.userId
        const { db } = await connectToDatabase()
        const likes = await db.collection('likes').find({userId: userId}).count()
        res.status(200).json(likes)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}