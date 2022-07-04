import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const pipeline = [
                    {
                        '$lookup': {
                            'from': 'photos',
                            'localField': '_id',
                            'foreignField': 'postId',
                            'as': 'photoData'
                        }
                    }, {
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
                    }
                ]
                const { db } = await connectToDatabase()
                const posts = await db.collection("posts").aggregate(pipeline).sort({createdAt: -1}).toArray();
                res.status(200).json(posts)
            }
            catch (error) {
                res.status(500).json({ error })
            }
        break
    }
}