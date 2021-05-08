window.onload = function() {
    // console.log(Date.now());
    // console.log(localStorage.accessTokenExpiration);
    if (localStorage.accessTokenExpiration === undefined || Date.now() > localStorage.accessTokenExpiration) {
        window.location.replace('/login.html')
    }
}

