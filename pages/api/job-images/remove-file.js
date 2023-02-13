import { errorHandler } from '@/pages/api/error-handler';
import { jwtMiddleware } from '@/pages/api/jwt-middleware';
import GCS from '@/util/google-cloud-storage';

export default async function handler(req, res) {
    try {
        await jwtMiddleware(req, res);
        return await remove(req, res);
    } catch (error) {
        errorHandler(error, res);
    }
}

const remove = async (req, res) => {
    try {
        if (req.query.file && req.query.file != '') {
            const existingFile = GCS.Storage.bucket.file(req.query.file);
            await existingFile.delete({});
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.log('error' + error)
        res.status(500).json({ success: false, message: 'Something went wrong, please contact with administrater.' })
    }
}