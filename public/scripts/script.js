class chat {
    constructor() {
        window.th = this
    }
    send() {
        var msgText = document.querySelector("#Message").value;
        var userName = Cookies.get('userName');

        console.log(`saas`);
    }
    setName() {
        var userName = document.querySelector("#username").value
        Cookies.set("userName", userName, { expires: 7 })
    }

}

