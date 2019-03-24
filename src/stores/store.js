import { action, observable } from 'mobx'


class Store {
    @observable isLoggedIn = false
    @observable userName = null
    @observable userType = null 

    @action
    loginUser = (userName) => {
        this.isLoggedIn = true;
        this.userName = userName;
    }
    @action
    setUserType = (userType) => {
        this.userType = userType;
    }
}


export const store = new Store()
