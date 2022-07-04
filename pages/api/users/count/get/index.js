// GET TOTAL USER COUNT

import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase()
        const userCount = await db.collection('users').countDocuments()
        res.status(200).json(userCount)
    }
    catch (error) {
        res.status(500).json({ error })
        console.log('error: ',error)
    }

}