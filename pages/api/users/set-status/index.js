import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'PUT':
            try {
                const { db } = await connectToDatabase()
                const filter = { id: req.body.userId }
                const replacement = { $set: { "active": req.body.isActive } }
                await db.collection('users').updateOne(filter, replacement)
                res.status(200).json({ success: true })
            }
            catch (error) {
                res.status(500).json({ error })
            }
        break
    }
}