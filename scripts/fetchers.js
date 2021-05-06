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