import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const userId = req.query.userId
        const { db } = await connectToDatabase()
        const posts = await db.collection('posts').find({userId: userId}).count()
        res.status(200).json(posts)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}