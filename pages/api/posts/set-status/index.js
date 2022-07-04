import { connectToDatabase } from 'libs/mongodb'
//var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'PUT':
            try {
                const { db } = await connectToDatabase()
                //const newObjectId = new ObjectId(req.body.postId)
                const filter = { _id: req.body.postId }
                const replacement = { $set: { "published": req.body.published } }
                await db.collection('posts').updateOne(filter, replacement)
                res.status(200).json({ success: true })
            }
            catch (error) {
                res.status(500).json({ error })
                console.log("error", error)
            }
        break
    }
}