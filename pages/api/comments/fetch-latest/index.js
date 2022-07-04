import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const pipeline = [
                    {
                        '$lookup': {
                            'from': 'users',
                            'localField': 'userId',
                            'foreignField': 'id',
                            'as': 'userData'
                        }
                    }, {
                        '$sort': {
                            'createdAt': -1
                        }
                    }, {
                        '$limit': 5
                    }
                ]
                const { db } = await connectToDatabase()
                const comments = await db.collection("comments").aggregate(pipeline).toArray();
                res.status(200).json(comments)
            }
            catch (error) {
                res.status(500).json({ error })
            }
        break
    }
}