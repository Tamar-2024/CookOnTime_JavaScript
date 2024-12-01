let userDatas = JSON.parse(localStorage.getItem('userDatas')) || [];

// פונקציה לבדיקת סיסמה חזקה
function isStrongPassword(password) {
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPassword.test(password);
}

// פונקציה להצגת טופס התחברות
function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
}

// פונקציה להצגת טופס רישום
function showSignUp() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

// פונקציה להתחברות משתמש
function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let usernameFound = false;
    let passwordFound = false;
    // לולאה על כל המערך כדי לבדוק אם שם המשתמש והסיסמה תואמים
    for (const userData of userDatas) {
        if (username === userData.username) {
            usernameFound = true;
        }
        if (password === userData.password) {
            passwordFound = true;
        }
        // אם גם השם וגם הסיסמה נכונים
        if (usernameFound && passwordFound) {
            localuser(username,password);
            window.location.href = 'step.html'; // מעבר לדף אחר בהצלחה
            return;
        }
    }

    // אם אחד מהנתונים נכון והשני לא
    if (usernameFound || passwordFound) {
        alert('Username or password incorrect');
    } else {
        alert('No user found, Please register first');
    }
}


// פונקציה לרישום משתמש
function signUpUser() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (!isStrongPassword(password)) {
        alert('Password is not strong enough. It must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
        return false;
    }

    // בדיקה אם כתובת המייל או הסיסמה כבר קיימים
    let emailExists = false;
    let passwordExists = false;

    for (let i = 0; i < userDatas.length; i++) {
        if (userDatas[i].email === email) {
            emailExists = true;
        }
        if (userDatas[i].password === password) {
            passwordExists = true;
        }
        // אפשר להפסיק את הלולאה אם אחד מהם נמצא
        if (emailExists || passwordExists) {
            break;
        }
    }

    if (emailExists||passwordExists) {
        alert('Email or password already exists. Please choose a different email.');
        return false;
    }
    else{
        const userData = {
            check: false,
            username: username,
            email: email,
            password: password,
            setPrice: function(x) {
                this.price += x;
            }
        };
        userDatas.push(userData);
        localStorage.setItem('userDatas', JSON.stringify(userDatas));
    
        window.location.href = 'step.html';
        localuser(username,password);
    
    }
   
  
}
function localuser(username,password)
{
    localStorage.setItem('player', username);
    localStorage.setItem('playerpassword', password);
}
