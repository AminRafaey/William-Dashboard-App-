import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const postId = req.query.postId
        const { db } = await connectToDatabase()
        const likes = await db.collection('likes').find({likedThing: postId}).count()
        res.status(200).json(likes)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}