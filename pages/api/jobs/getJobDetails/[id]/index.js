// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '@/util/mongodb';
import JobModel from '@/src/models/job-model';

export default async function handler(req, res) {
    const id = req.query['id']
    const { db } = await connectToDatabase();
    const job = await db
        .collection('jobs')
        .findOne({_id: id})
        //.project({ _id: 0, id: 1, name: 1 })
        //.sort({ metacritic: -1 })
        //.limit(1)
        //.toArray();
    var model = Object.seal(new JobModel());
    model = Object.assign(model, job);
    res.status(200).json(model);
}