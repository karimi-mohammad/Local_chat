class chat {
    constructor() {
        window.th = this
    }
    send() {
        var msgText = document.querySelector("#Message").value;
        var userName = Cookies.get('userName');
        console.log(userName);
        if (userName && userName != "") {
            if (msgText && msgText != "") {
                const data = {
                    "userName": userName,
                    "Msg": msgText
                }
                const requestOption = {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
                fetch("./api/sendMsg.php", requestOption)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                alert("msg text in empty")
            }
        } else {
            alert("at first you should set a user name")
        }

    }
    setName() {
        var userName = document.querySelector("#username").value
        Cookies.set("userName", userName, { expires: 7 })
    }

}

