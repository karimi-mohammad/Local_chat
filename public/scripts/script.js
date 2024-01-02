class chat {
    constructor() {
        window.th = this
    }
    send() {
        var msgText = document.querySelector("#Message").value;
        document.querySelector("#Message").value = "";
        var userName = Cookies.get('userName');
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
                        if (!response.ok) {
                            throw new Error('Network response was not ok.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        this.loadMsgs()
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
    loadMsgs() {
        const requestOption = {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },

        }
        fetch("./api/loadMsgs.php", requestOption)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                data["data"].reverse()
                const chatContainer = document.querySelector('.chat');
                chatContainer.innerHTML = ""
                data["data"].forEach(item => {
                    if (item.user_name === Cookies.get("userName")) {
                        this.createMessageElement(item.user_name, item.message, true);
                    } else {
                        this.createMessageElement(item.user_name, item.message, false);
                    }
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

    }
    createMessageElement(user, message, isMyMessage) {
        const chatContainer = document.querySelector('.chat');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-msg');
        messageDiv.classList.add(isMyMessage ? 'my-msg' : 'other-msg');
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.textContent = user;
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('msg');
        msgDiv.innerText = message;
        messageDiv.appendChild(userDiv);
        messageDiv.appendChild(msgDiv);
        chatContainer.appendChild(messageDiv);
    }

}

