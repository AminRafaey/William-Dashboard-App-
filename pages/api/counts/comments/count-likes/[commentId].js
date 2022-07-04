import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const commentId = req.query.commentId
        const { db } = await connectToDatabase()
        const commentLikes = await db.collection('likes').find({likedThing: commentId}).count()
        res.status(200).json(commentLikes)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}