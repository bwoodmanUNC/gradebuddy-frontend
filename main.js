function submitForm(){
    form = '#form'
    var url = 'http://localhost:8000/token';
    var formData = {};
    // $(form).find("input[username]").each(function (index, node) {
    //     formData[node.username] = node.value;
    // });
    // $(form).find("input[password]").each(function (index, node) {
    //     formData[node.password] = node.value;
    // });
    formData['username'] = $('#username').val()
    formData['password'] = $('#password').val()
    console.log(formData);
    $.post(url, formData).done(function (data) {
        console.log(data);
        tokenSuccess(data);
    });
}

function testApi() {
    settings = {
        url: 'http://localhost:8000/users/me',
        type: 'GET',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem('accessToken')}
    }
    $.ajax(settings).done((data) => {
        console.log(data);
    });
}

function newClass() {
    // obj = {id: 1, name: "ben", professor: "ben2"};
    settings = {
        url: 'http://localhost:8000/new/class',
        type: 'POST',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem('accessToken')},
        data: '{id: 1, name: "ben", professor: "ben2"}'
    }
    $.ajax(settings).done((data) => {
        console.log(data);
    });
}

function tokenSuccess(response) {
    localStorage.accessToken = response['access_token'];
}