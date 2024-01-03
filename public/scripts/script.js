class chat {
    constructor() {
        window.th = this
    }
    scrollToEndChat(){
        const chatElem = document.querySelector(".chat")
        chatElem.scrollTo({
            top: chatElem.scrollHeight,
            left: 5,
            behavior: "smooth"
        })
    }
    copyToBoard(text) {
        navigator.clipboard.writeText(text)
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
        this.scrollToEndChat()
    }
    setName() {
        var userName = document.querySelector("#username").value
        Cookies.set("userName", userName, { expires: 7 })
    }
    setLimit() {
        var limit = document.querySelector("#limit").value
        Cookies.set("limit", limit, { expires: 7 })
    }
    loadMsgs() {
        var limit = Cookies.get("limit");
        if (!(limit && limit != "")) {
            limit = 20
        }
        const data = { "limit": limit }
        const requestOption = {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
        const msgBtns = document.createElement('div');
        const copybtn = document.createElement('button');
        copybtn.classList.add("p-2")
        copybtn.classList.add("m-3")
        // copybtn.classList.add("")

        copybtn.innerText = "<Copy>";
        copybtn.addEventListener('click', () => { this.copyToBoard(message) });
        msgBtns.appendChild(copybtn);
        messageDiv.appendChild(userDiv);
        messageDiv.appendChild(msgDiv);
        messageDiv.appendChild(msgBtns);
        chatContainer.appendChild(messageDiv);
    }

}

