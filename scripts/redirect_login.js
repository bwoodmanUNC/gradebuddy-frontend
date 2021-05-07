window.onload = function() {
    // console.log(Date.now());
    // console.log(localStorage.accessTokenExpiration);
    if (Date.now() > localStorage.accessTokenExpiration) {
        window.location.replace('/login')
    }
}

