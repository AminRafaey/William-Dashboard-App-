import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const commentId = req.query.commentId
        const { db } = await connectToDatabase()
        const replies = await db.collection('comments').find({replyingTo: commentId}).count()
        res.status(200).json(replies)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}