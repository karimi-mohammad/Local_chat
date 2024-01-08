class chat {
    constructor() {
        // set down btn
        document.addEventListener('DOMContentLoaded', () => {
            const down = document.querySelector(".down")
            const height = down.clientHeight
            down.style.setProperty('--down-height', height + "px")

        })
    }
    scrollToEndChat() {
        const chatElem = document.querySelector(".chat")
        chatElem.scrollTo({
            top: chatElem.scrollHeight,
            left: 5,
            behavior: "smooth"
        })
    }
    clearMsgs() {
        var isAdmin = confirm("This action is intended for admins only. Are you an admin?");
        if (isAdmin) {
            var userName = prompt("Please enter your admin username:");
            var password = prompt("Please enter your admin password:");
            if (userName === null || userName === "" || password === null || password === "") {
                alert("Input is not valid");
            } else {
                const data = {
                    "userName": userName,
                    "password": password
                };
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };
                fetch("./api/clearMsgs.php", requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok.');
                        }
                        console.log(response);
                        return response.json();
                    })
                    .then(data => {
                        if (data.success === true) {
                            alert("Success");
                        } else {
                            alert(`There is a problem:\n ${data.error}`);
                        }
                        this.loadMsgs();
                    })
                    .catch(error => {
                        console.error('There has been a problem with your fetch operation:', error);
                    });
            }
        }
    }
    copyToBoard(text) {
        const txtEle = document.createElement('textarea')
        txtEle.innerText = text
        document.body.appendChild(txtEle)
        txtEle.select()
        document.execCommand('copy')
        document.body.removeChild(txtEle)
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
        Cookies.set("userName", userName, { expires: 365 * 3 })
        location.reload();
    }
    setLimit() {
        var limit = document.querySelector("#limit").value
        Cookies.set("limit", limit, { expires: 365 * 3 })
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
                const chatContainer = document.querySelector('.content');
                chatContainer.innerHTML = ""
                data["data"].forEach(item => {
                    if (item.user_name === Cookies.get("userName")) {
                        this.createMessageElement(item.user_name, item.message, true, item.time_sent);
                    } else {
                        this.createMessageElement(item.user_name, item.message, false, item.time_sent);
                    }
                });

            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
    createMessageElement(user, message, isMyMessage, date) {
        const chatContainer = document.querySelector('.content');
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
        const dateP = document.createElement('p');
        dateP.innerText = date;
        dateP.classList.add("date");
        copybtn.innerText = "<Copy>";
        copybtn.addEventListener('click', () => { this.copyToBoard(message) });
        msgBtns.appendChild(copybtn);
        messageDiv.appendChild(userDiv);
        messageDiv.appendChild(msgDiv);
        messageDiv.appendChild(msgBtns);
        messageDiv.appendChild(dateP);
        chatContainer.appendChild(messageDiv);
    }
}

