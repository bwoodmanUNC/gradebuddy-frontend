function newClass() {
    // obj = {id: 1, name: "ben", professor: "ben2"};
    const new_class = {name: $('#className').val()};
    settings = {
        url: 'http://localhost:8000/new/class',
        type: 'POST',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem('accessToken')},
        data: JSON.stringify(new_class)
    }
    console.log(settings);
    $.ajax(settings).done((data) => {
        console.log(data);
    });
}

function newUpload() {
    const form = document.getElementById('form');
    console.log(form);
    let formData = new FormData(form);
    formData.append('assignment_id', 3);

    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    settings = {
        url: 'http://localhost:8000/new/upload',
        type: 'POST',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem('accessToken')},
        data: formData,
        contentType: false,
        processData: false
    }

    $.ajax(settings).done((data) => {
        console.log(data);
    });

}