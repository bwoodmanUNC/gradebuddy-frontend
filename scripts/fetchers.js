const URL_BASE = 'https://gradebuddy.herokuapp.com';

async function get_submissions(assignment_id) {
    // const edited_tweet = prompt('Edit tweet:', body);
    const result = await axios({
        method: 'get',
        url: URL_BASE + '/assignments/' + assignment_id.toString(),
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
        url: URL_BASE + '/class/' + class_id.toString(),
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
        url: URL_BASE + '/new/upload',
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
        url: URL_BASE + '/uploads/' + upload_id.toString(),
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
        url: URL_BASE + '/new/grade',
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
        url: URL_BASE + '/update/grade',
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
        url: URL_BASE + '/list/classes',
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
        url: URL_BASE + '/new/assignment',
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        },
        data: JSON.stringify(assignment_obj)
    });

    return result;
}

async function new_class(class_name) {
    const class_obj = {name: class_name};
    // console.log(JSON.stringify(class_obj));

    const result = await axios({
        method: 'post',
        url: URL_BASE + '/new/class',
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        },
        data: JSON.stringify(class_obj)
    });

    return result;
}

async function get_owned_classes() {
    const result = await axios({
        method: 'get',
        url: URL_BASE + '/list/owned_classes',
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        }
    });

    return result;
}

async function add_student_to_class(join_code) {
    // const data = {join_code: join_code};

    const result = await axios({
        method: 'post',
        url: URL_BASE + '/join/class/' + join_code.toString(),
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        },
    });

    return result;
}

async function get_all_grades(id) {
    const result = await axios({
        method: 'get',
        url: URL_BASE + '/list/submission_grades/' + id.toString(),
        headers: {
            Authorization: 'Bearer '  + localStorage.getItem('accessToken'),
        }
    });

    return result;
}