// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '@/util/mongodb';
import ResponseTypeService from '@/src/services/response-type-service';
import CommonService from '@/src/services/common-service';
import fs from 'fs';
import mime from 'mime'
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
        const jobs = await db
            .collection('jobs')
            .find(requestModel.queryModel)
            .project(responseModel)
            .sort({ adDate: -1 })
            //.limit(1)
            .toArray();

        res.status(200).json({ success: true, message: '', data: jobs });
    } catch (error) {
        console.log(`api response error: ` + error)
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.', data: [] })
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
        const { db } = await connectToDatabase();
        await db.collection("jobs").deleteOne(req.body);
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

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

function getType(type) {
    switch (type.toLocaleLowerCase()) {
        case 'image/jpeg':
            return 'jpg';
        case 'image/png':
            return 'png';
        default:
            return 'jpg';
    }
}

function uploadImage(imgB64Data, imageName) {
    var result = null;
    if (imgB64Data != null) {
        var decodedImg = decodeBase64Image(imgB64Data);
        var imageBuffer = decodedImg.data;
        var type = decodedImg.type;
        var extension = getType(type);
        var fileName = `${imageName}.${extension}`;
        fs.writeFileSync(process.cwd() + "/public/img/" + fileName, imageBuffer, 'utf8');
        result = `${fileName}`;
    }
    return result;
}

function _base64ToArrayBuffer(binary_string) {
    //var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

async function uploadToDrive(base64String) {
    try {
        //859530
        var fileMetadata = {
            'name': 'photo.png',
            'Content-Type': 'application/json; charset=UTF-8'
        };
        var media = {
            mimeType: 'image/png',
            body: _base64ToArrayBuffer(base64String)
            //body: fs.createReadStream() ('files/photo.png')
        };
        var url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
        var options = {
            headers: {
                "Content-type": 'multipart/related; boundary="foo_bar_baz"',
                "Content-Length": 859530,
                "Authorization": "Bearer ya29.A0ARrdaM-HqKHSrC6uC8sCgp4fzj8VxV_jfZe7-5E2KWep9GRiWBpXl0CYPfLe09leDpXwJ9mnkjqjk7IPoITx-ZxSUA3FJPMSrYOZhssN73yTBhkrKbUO8fY9zXkcfIEKaj2lmBOGfe3l--hM6zpUiXrF0MW6"
            },
            method: "POST",
            body: '--foo_bar_baz "Content-Type": "application/json; charset=UTF-8", {"name": "photo.png"}, "--foo_bar_baz Content-Type": "text/txt" ' + _base64ToArrayBuffer(base64String)

            //body: _base64ToArrayBuffer(base64String)
            //body: {
            //metadata: fileMetadata,
            //media: media,
            //}
        };
        const res = await fetch(url, options)
        var response = await res.json()
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

