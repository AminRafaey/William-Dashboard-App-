import { connectToDatabase } from 'libs/mongodb'
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'PUT':
            try {
                const { db } = await connectToDatabase()
                const newObjectId = new ObjectId(req.body.photoId)
                const filter = { _id: newObjectId }
                const replacement = { $set: { "published": req.body.isPublished } }
                await db.collection('photos').updateOne(filter, replacement)
                res.status(200).json({ success: true })
            }
            catch (error) {
                res.status(500).json({ error })
            }
        break
    }
}