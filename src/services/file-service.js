import ApiService from "./api-service";

class FileService {
    static async uploadFile(model) {
        await ApiService.add(`upload.php`, model, process.env.FILE_SERVICE_API_URI);
    }
    
    static async updateFile(model) {
        await this.removeFile(model.existingFileName);
        await ApiService.add(`upload.php`, model, process.env.FILE_SERVICE_API_URI);
    }
    
    static async removeFile(fileName) {
        await ApiService.get(`remove.php?fileName=${fileName}`, process.env.FILE_SERVICE_API_URI);
    }
}

export default FileService
