import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const userId = req.query.userId
        const { db } = await connectToDatabase()
        const photos = await db.collection('photos').find({userId: userId}).count()
        res.status(200).json(photos)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}