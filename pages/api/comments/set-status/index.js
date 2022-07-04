import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'PUT':
            try {
                const { db } = await connectToDatabase()
                const filter = { _id: req.body.commentId }
                const replacement = { $set: { "published": req.body.isPublished } }
                await db.collection('comments').updateOne(filter, replacement)
                res.status(200).json({ success: true })
            }
            catch (error) {
                res.status(500).json({ error })
            }
        break
    }
}