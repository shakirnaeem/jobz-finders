import { errorHandler } from '@/pages/api/error-handler';
import { jwtMiddleware } from '@/pages/api/jwt-middleware'
import GCS from '@/util/google-cloud-storage';

export default async function handler(req, res) {
    try {
        await jwtMiddleware(req, res);
        return await Upload(req, res);
    } catch (error) {
        errorHandler(error, res);
    }
}

const Upload = async (req, res) => {
    try {
        const file = GCS.Storage.bucket.file(req.query.file);
        const options = {
            expires: Date.now() + 1 * 60 * 1000, //  1 minute,
            fields: { 'x-goog-meta-test': 'data' },
        };

        const [response] = await file.generateSignedPostPolicyV4(options);
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.log('error' + error)
        res.status(500).json({ success: false, message: 'Something went wrong, please contact with administrater.' })
    }
}