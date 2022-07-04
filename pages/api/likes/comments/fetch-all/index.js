import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const pipeline = [
                    {
                        '$lookup': {
                            'from': 'comments',
                            'localField': 'likedThing',
                            'foreignField': '_id',
                            'as': 'commentData'
                        }
                    }, {
                        '$lookup': {
                            'from': 'users',
                            'localField': 'userId',
                            'foreignField': '_id',
                            'as': 'userData'
                        }
                    }, {
                        '$lookup': {
                            'from': 'users',
                            'localField': 'commentData.userId',
                            'foreignField': '_id',
                            'as': 'creatorData'
                        }
                    }, {
                        '$match': {
                            'commentData': {
                                '$ne': []
                            }
                        }
                    }, {
                        '$sort': {
                            'createdAt': -1
                        }
                    }
                ]
                const { db } = await connectToDatabase()
                const likes = await db.collection("likes").aggregate(pipeline).sort({createdAt: -1}).toArray();
                res.status(200).json(likes)
            }
            catch (error) {
                res.status(500).json({ error })
            }
        break
    }
}