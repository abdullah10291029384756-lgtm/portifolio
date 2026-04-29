const username = document.getElementById("username");
const email = document.getElementById("email");
const loginUserName = document.getElementById("loginUsername");
const loginEmail = document.getElementById("loginEmail");
const div3 = document.getElementById("div3");
const comment = document.getElementById("comment");
const Dev = document.getElementById("Dev");

let arr = JSON.parse(localStorage.getItem("newUser")) || [];
const msi = JSON.parse(localStorage.getItem("message")) || [];

function signup() {
    if (username.value.trim() === "" || email.value.trim() === "") {
        alert("You must enter something");
        return;
    }

    const newUser = {
        userName: username.value.trim(),
        email: email.value.trim()
    };

    arr.push(newUser);
    localStorage.setItem("newUser", JSON.stringify(arr));

    username.value = "";
    email.value = "";
    alert("Signup successful! You can now login.");
}

// تسجيل الدخول
function login() {
    if (loginUserName.value.trim() === "" || loginEmail.value.trim() === "") {
        alert("You must enter something");
        return;
    }

    const foundUser = arr.find(user =>
        user.userName === loginUserName.value.trim() &&
        user.email === loginEmail.value.trim()
    );

    if (!foundUser) {
        div3.innerHTML = '<p style="color:red;">Invalid credentials</p>';
    } else {
        div3.innerHTML = `<p style="color:green;">Welcome, ${foundUser.userName}</p>`;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", foundUser.userName);

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }

    loginUserName.value = "";
    loginEmail.value = "";
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "signin.html";
}

function checkLogin() {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "signin.html";
    } else {
        const user = localStorage.getItem("currentUser");
        document.body.insertAdjacentHTML("afterbegin", 
            `<p>Logged in as: ${user}</p><button onclick="logout()">Logout</button>`);
    }
}

function send() { 
    if (comment.value.trim() === "") {
        alert("You must enter a comment");
        return;
    }

    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("You must be logged in to comment");
        return;
    }

    const message = {
        comment: comment.value.trim(),
        sender: currentUser
    };

    msi.push(message);
    localStorage.setItem("message", JSON.stringify(msi));

    renderMessages();

    comment.value = "";
}

function renderMessages() {
    Dev.innerHTML = "<ul>";
    msi.forEach((msg, i) => {
        Dev.innerHTML += `
            <li>
                <img src="images/istockphoto-1495088043-612x612.jpg" id="imgUser" alt="avatar">
                <strong>${msg.sender}</strong>: ${msg.comment}
                ${msg.sender === localStorage.getItem("currentUser") 
                    ? `<button onclick="deletemessage(${i})">Delete</button>` 
                    : ""}
            </li>
        `;
    });
    Dev.innerHTML += "</ul>";
}

function deletemessage(i) {
    const currentUser = localStorage.getItem("currentUser");
    if (msi[i].sender !== currentUser) {
        alert("You can only delete your own comments");
        return;
    }

    msi.splice(i, 1);
    localStorage.setItem("message", JSON.stringify(msi));
    renderMessages();
}
// إظهار الزر عند النزول لأسفل
window.onscroll = function() {
  const btn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// عند الضغط على الزر يرجع لأعلى الصفحة
document.getElementById("scrollTopBtn").onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


window.onload = renderMessages;
