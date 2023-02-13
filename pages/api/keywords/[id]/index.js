// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req, res) {
    switch (req.method) {
        case 'DELETE':
            return await Delete(req, res);
    }
}

const Delete = async (req, res) => {
    const id = req.query['id'];
    var successResponse = false;
    try {
        const { db } = await connectToDatabase();
        await db.collection("jobKeywords").deleteOne({ "_id": id });
        successResponse = true;
    } catch (error) {
        console.log('error' + error)
    }
    if (successResponse)
        res.status(200).json({ success: true, message: 'Keyword deleted successfully.' })
    else
        res.status(500).json({ success: false, message: 'Something went wrong, please contact with administrater.' })
}

