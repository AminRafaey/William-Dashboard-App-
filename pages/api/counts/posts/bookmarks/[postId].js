import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const postId = req.query.postId
        const { db } = await connectToDatabase()
        const bookmarks = await db.collection('bookmarks').find({postId: postId}).count()
        res.status(200).json(bookmarks)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}