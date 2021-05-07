async function get_submissions(assignment_id) {
    // const edited_tweet = prompt('Edit tweet:', body);
    const result = await axios({
        method: 'get',
        url: 'http://localhost:8000/assignments/' + assignment_id.toString(),
        // withCredentials: true,
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        }
    });

    return result;
}

async function get_class_assignments(class_id) {
    // const edited_tweet = prompt('Edit tweet:', body);
    const result = await axios({
        method: 'get',
        url: 'http://localhost:8000/class/' + class_id.toString(),
        // withCredentials: true,
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        }
    });

    return result;
}

async function upload_submission(formData) {
    // const edited_tweet = prompt('Edit tweet:', body);
    const result = await axios({
        method: 'post',
        url: 'http://localhost:8000/new/upload',
        // withCredentials: true,
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        },
        data: formData
    });

    return result;
}

async function get_indv_upload(upload_id) {
    const result = await axios({
        method: 'get',
        url: 'http://localhost:8000/uploads/' + upload_id.toString(),
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        }
    });

    return result;
}

async function new_grade(upload_id, score, selected_rubric_items) {
    let formData = new FormData();
    formData.append('upload_id', upload_id);
    formData.append('score', score);
    formData.append('selected_rubric_items', selected_rubric_items);
    const result = await axios({
        method: 'post',
        url: 'http://localhost:8000/new/grade',
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        },
        data: formData
    });

    return result;
}

async function update_grade(grade_id, upload_id, score, selected_rubric_items) {
    let formData = new FormData();
    formData.append('grade_id', grade_id);
    formData.append('upload_id', upload_id);
    formData.append('score', score);
    formData.append('selected_rubric_items', selected_rubric_items);
    const result = await axios({
        method: 'put',
        url: 'http://localhost:8000/update/grade',
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        },
        data: formData
    });

    return result;
}

async function get_classes() {
    const result = await axios({
        method: 'get',
        url: 'http://localhost:8000/list/classes',
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        }
    });

    return result;
}

async function new_assignment(name, rubric_items, class_id) {
    const assignment_obj = {name: name, rubric: JSON.stringify(rubric_items), class_id: parseInt(class_id)};
    console.log(JSON.stringify(assignment_obj));

    const result = await axios({
        method: 'post',
        url: 'http://localhost:8000/new/assignment',
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        },
        data: JSON.stringify(assignment_obj)
    });

    return result;
}