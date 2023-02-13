export class NavigationModel {
    constructor() {
        this.key = '';
        this.title = '';
        this.search = '';
    }
}

export class NavigationBaseModel {
    constructor() {
        this.category = '';
        this.navs = [NavigationModel];
    }
}

export class NavigationMainModel {
    constructor() {
        this.navigations = [NavigationBaseModel];
    }
}

module.exports = { NavigationMainModel, NavigationBaseModel, NavigationModel }