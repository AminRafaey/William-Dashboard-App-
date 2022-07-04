import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const userId = req.query.userId
        const { db } = await connectToDatabase()
        const comments = await db.collection('comments').find({userId: userId}).count()
        res.status(200).json(comments)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}