// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '@/util/mongodb';
import ResponseTypeService from '@/src/services/response-type-service';
import CommonService from '@/src/services/common-service';
import { errorHandler } from '@/pages/api/error-handler';
import { jwtMiddleware } from '@/pages/api/jwt-middleware';

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                return await GetList(req, res);
            case 'POST':
                await jwtMiddleware(req, res);
                return await Add(req, res);
            case 'PUT':
                await jwtMiddleware(req, res);
                return await Update(req, res);
            case 'DELETE':
                await jwtMiddleware(req, res);
                return await Delete(req, res);
        }
    } catch (error) {
        errorHandler(error, res);
    }
}

const GetList = async (req, res) => {
    try {
        var responseModel = ResponseTypeService.getResponseTypeModel(req.query['responseType']);
        var requestModel = CommonService.queryStringToJSON(req.url);
        const { db } = await connectToDatabase();
        
        const queryModel = requestModel.queryModel ? CommonService.applyContains(requestModel.queryModel) : {};

        const count = await db
        .collection('jobs')
        .find(queryModel).count();

        const jobs = await db
            .collection('jobs')
            .find(queryModel)
            .project(responseModel)
            .sort({ adDate: -1 })
            .skip(parseInt(requestModel.pageSize) * (parseInt(requestModel.pageNo) - 1))
            .limit(parseInt(requestModel.pageSize))
            .toArray();

        res.status(200).json({ success: true, message: '', data: jobs, count: count });
    } catch (error) {
        console.log(`api response error: ` + error)
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.', data: [], count: 0 })
    }
}

const Add = async (req, res) => {
    var successResponse = false;
    try {
        const job = getJobModel(req);
        const { db } = await connectToDatabase();
        await db.collection("jobs").insertOne(job);
        successResponse = true;
    } catch (error) {
        console.log('error' + error)
    }
    if (successResponse)
        res.status(200).json({ success: true, message: 'Job added successfully.' })
    else
        res.status(500).json({ success: false, message: 'Something went wrong, please contact with administrater.' })
}

const Update = async (req, res) => {
    var successResponse = false;
    try {
        const job = getJobModel(req);
        const { db } = await connectToDatabase();
        await db.collection("jobs").updateOne(
            { _id: job._id },
            { $set: job }
        );
        successResponse = true;
    } catch (error) {
        console.log('error' + error)
    }
    if (successResponse)
        res.status(200).json({ success: true, message: 'Job updated successfully.' })
    else
        res.status(500).json({ success: false, message: 'Something went wrong, please contact with administrater.' })
}

const Delete = async (req, res) => {
    var successResponse = false;
    try {
        var requestModel = CommonService.queryStringToJSON(req.url);
        const { db } = await connectToDatabase();
        await db.collection("jobs").deleteOne(requestModel);
        successResponse = true;
    } catch (error) {
        console.log('error' + error)
    }
    if (successResponse)
        res.status(200).json({ success: true, message: 'job deleted successfully.' })
    else
        res.status(500).json({ success: false, message: 'Something went wrong, please contact with administrater.' })
}

function getJobModel(req) {
    return {
        _id: req.body._id,
        adDate: new Date(req.body['adDate']),
        adSource: req.body['adSource'],
        adType: req.body['adType'],
        title: req.body['title'],
        positions: req.body['positions'],
        locations: req.body['locations'],
        keywords: req.body['keywords'],
        adDetail: req.body['adDetail'],
        fileName: req.body['fileName'],
        active: req.body['active']
    }
}

