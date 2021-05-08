async function login(callback){
    form = '#form'
    // var url = 'http://localhost:8000/token';
    var url = 'https://gradebuddy.herokuapp.com/token';
    var formData = new FormData();
    // $(form).find("input[username]").each(function (index, node) {
    //     formData[node.username] = node.value;
    // });
    // $(form).find("input[password]").each(function (index, node) {
    //     formData[node.password] = node.value;
    // });
    formData.append('username', $('#username').val())
    formData.append('password', $('#password').val())
    // formData['password'] = $('#password').val()
    console.log(formData);
    let result;
    try {
        result = await axios({
            method: 'post',
            url: url,
            data: formData
        });

        if (result.status == 200) {
            tokenSuccess(result.data);
            return true;
        }
    } catch (err) {
        console.log(err);
    }

    return false;
    // console.log(result);

}

function tokenSuccess(response) {
    localStorage.accessToken = response['access_token'];
    // exp_date.setSeconds(exp_date.getSeconds() +)
    localStorage.accessTokenExpiration = Date.now() + (response['exp'] * 1000);
    window.location.replace('/classes.html')
    
}

document.getElementById('login-submit').addEventListener('click', async function() {
    const result = await login();
    console.log(result);
    if (!result) {
        $('<div id="error-login" class="notification is-danger">Invalid login credentials.</div>').appendTo('#login-box');
    }
});