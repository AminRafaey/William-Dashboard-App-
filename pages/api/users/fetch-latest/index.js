import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const { db } = await connectToDatabase()
                const users = await db.collection('users').find().limit(5).sort({createdAt:-1}).toArray()
                res.status(200).json(users)
            }
            catch (error) {
                res.status(500).json({ error })
            }
        break
    }
}