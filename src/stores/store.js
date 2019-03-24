import { action, observable } from 'mobx'


class Store {
    @observable isLoggedIn = false
    @observable userName = null
    @observable userType = null 

    @action
    loginUser = (userName, userType) => {
        this.isLoggedIn = true;
        this.userName = userName;
        this.userType = userType;
    }
}


export const store = new Store()
