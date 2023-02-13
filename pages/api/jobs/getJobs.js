// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req, res) {
    try {
        const searchKey = req.query['searchkey'];
        const searchLoc = req.query['searchloc'];
        const search = {};
        if(searchKey)
            search['keywords'] = { '$regex' : searchKey, '$options' : 'i' };
        if(searchLoc)
            search['locations'] = { '$regex' : searchLoc, '$options' : 'i' };
        const { db } = await connectToDatabase();
        const jobs = await db
            .collection("jobs")
            .find(search)
            //.project({ _id: 0, id: 1, name: 1 })
            //.sort({ metacritic: -1 })
            //.limit(20)
            .toArray();
        res.status(200).json(jobs);
    }
    catch (e) {
        console.log(`error: ${e}`)
        res.status(200).json([]);
    }

}