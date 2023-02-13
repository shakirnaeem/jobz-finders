export default class JobModel {
    constructor() {
        this._id = '';
        this.adDate = new Date();
        this.adSource = '1';
        this.adType = 1;
        this.title = '';
        this.positions = '';
        this.locations = '';
        this.keywords = '';
        this.adDetail = '';
        this.image = '';
        this.imageFile = '';
        this.fileName = '';
        this.active = true;
    }
}