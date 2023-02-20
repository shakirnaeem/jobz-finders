// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '@/util/mongodb';
import ResponseTypeService from '@/src/services/response-type-service';
import CommonService from '@/src/services/common-service';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return await GetList(req, res);
        case 'POST':
            return await Add(req, res);
        case 'PUT':
            return await Update(req, res);
        case 'DELETE':
            return await Delete(req, res);
    }
}

const GetList = async (req, res) => {
    try {
        var responseModel = ResponseTypeService.getResponseTypeModel(req.query['responseType']);
        var requestModel = CommonService.queryStringToJSON(req.url);
        const { db } = await connectToDatabase();

        const count = await db
            .collection('jobKeywords')
            .find(requestModel.queryModel).count();

        const jobKeywords = await db
            .collection('jobKeywords')
            .find(requestModel.queryModel)
            .project(responseModel)
            .sort({ adDate: -1 })
            .skip(parseInt(requestModel.pageSize) == 0 ? 0 : parseInt(requestModel.pageSize) * (parseInt(requestModel.pageNo) - 1))
            .limit(parseInt(requestModel.pageSize) == 0 ? count : parseInt(requestModel.pageSize))
            .toArray();

        res.status(200).json({ success: true, message: '', data: jobKeywords, count: count });
    } catch (error) {
        console.log(`api response error: ` + error)
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.', data: [], count: 0 })
    }
}

const Add = async (req, res) => {
    var successResponse = false;
    try {
        const { db } = await connectToDatabase();
        var a = await db.collection("jobKeywords").insertOne(req.body);
        successResponse = true;
    } catch (error) {
        console.log('error' + error)
    }
    if (successResponse)
        res.status(200).json({ success: true, message: 'Keyword added successfully.' })
    else
        res.status(500).json({ success: false, message: 'Something went wrong, please contact with administrater.' })
}

const Update = async (req, res) => {
    var successResponse = false;
    try {
        const { db } = await connectToDatabase();
        await db.collection("jobKeywords").updateOne(
            { _id: req.body._id },
            { $set: req.body }
        );
        successResponse = true;
    } catch (error) {
        console.log('error' + error)
    }
    if (successResponse)
        res.status(200).json({ success: true, message: 'Keyword updated successfully.' })
    else
        res.status(500).json({ success: false, message: 'Something went wrong, please contact with administrater.' })
}

const Delete = async (req, res) => {
    var successResponse = false;
    try {
        const { db } = await connectToDatabase();
        await db.collection("jobKeywords").deleteOne(req.body);
        successResponse = true;
    } catch (error) {
        console.log('error' + error)
    }
    if (successResponse)
        res.status(200).json({ success: true, message: 'Keyword deleted successfully.' })
    else
        res.status(500).json({ success: false, message: 'Something went wrong, please contact with administrater.' })
}

