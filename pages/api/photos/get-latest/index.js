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
                            'foreignField': '_id',
                            'as': 'userData'
                        }
                    }, {
                        '$sort': {
                            'createdAt': -1
                        }
                    }, {
                        '$limit': 9
                    }
                ]
                const { db } = await connectToDatabase()
                const photos = await db.collection("photos").aggregate(pipeline).toArray();
                res.status(200).json(photos)
            }
            catch (error) {
                res.status(500).json({ error })
            }
        break
    }
}