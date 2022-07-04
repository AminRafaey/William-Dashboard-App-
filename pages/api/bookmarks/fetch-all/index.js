import { connectToDatabase } from 'libs/mongodb'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const pipeline = [
                    {
                        '$lookup': {
                            'from': 'posts',
                            'localField': 'postId',
                            'foreignField': '_id',
                            'as': 'postData'
                        }
                    }, {
                        '$lookup': {
                            'from': 'photos',
                            'localField': 'postId',
                            'foreignField': 'postId',
                            'as': 'photoData'
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
                            'localField': 'postData.userId',
                            'foreignField': '_id',
                            'as': 'postCreatorData'
                        }
                    }, {
                        '$sort': {
                            'createdAt': -1
                        }
                    }
                ]
                const { db } = await connectToDatabase()
                const bookmarks = await db.collection("bookmarks").aggregate(pipeline).sort({createdAt: -1}).toArray();
                res.status(200).json(bookmarks)
            }
            catch (error) {
                res.status(500).json({ error })
            }
        break
    }
}