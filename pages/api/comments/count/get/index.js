// GET TOTAL COMMENT COUNT

import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase()
        const count = await db.collection('comments').countDocuments()
        res.status(200).json(count)
    }
    catch (error) {
        res.status(500).json({ error })
        console.log('error: ',error)
    }

}