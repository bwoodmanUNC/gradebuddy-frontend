class MainList extends React.Component {
    renderSubmissionListItems() {
        let all_items = [];
        for (let i = 0; i < this.props.data.length; i++) {
            console.log(this.props.data[i]);
            all_items.push(<SubmissionListItem id={this.props.data[i].id} user_name={this.props.data[i].user_name}></SubmissionListItem>);
        }
        return all_items;
    }

    renderAssignmentListItems() {
        let all_items = [];
        for (let i = 0; i < this.props.data.length; i++) {
            console.log(this.props.data[i]);
            all_items.push(<AssignmentListItem id={this.props.data[i].id} name={this.props.data[i].name} upload_number={this.props.data[i].num_uploads}></AssignmentListItem>);
        }
        return all_items;
    }

    render() {
        let all_items;
        if (this.props.type === 'submissions') {
            all_items = this.renderSubmissionListItems();
        } else if (this.props.type === 'assignments') {
            all_items = this.renderAssignmentListItems();
        }

        return (
            <div id='main-list'>
                {all_items}
            </div>
        )
    }
}

class SubmissionListItem extends React.Component {
    render() {
        return (
            // <div>
            //     <a href='#'>Submission Number: {this.props.submission_number} Link: {this.props.link}</a>
            // </div>
            <div class='block'>
                <div class="box submission_list_item">
                    <a class='has-text-weight-bold' href={"uploads?id=" + this.props.id}>Submission by {this.props.user_name}</a>
                    <p class='has-text-weight-bold'>Grade: </p>
                </div>
                {/* <a href='#'>Submission Number: {this.props.submission_number} Link: {this.props.link}</a> */}
            </div>
        )
    }
}

class AssignmentListItem extends React.Component {
    uploadClick = async () => {
        const props = this.props;
        document.getElementById('new_upload_btn_' + props.id.toString()).onchange = async function() {
            console.log('asdf');
            // document.getElementById("form").submit();
            console.log(props);
            let formData = new FormData();
            formData.append('assignment_id', props.id);
            formData.append('new_upload', document.getElementById('new_upload_btn_' + props.id.toString()).files[0]);
            const result = await upload_submission(formData);
            console.log(result);

            if (result.status === 200) {
                RenderDOM();
            }
        };
        
    }

    render() {
        return (
            <div class='block'>
                <div class="box assignment_list_item">
                    <p class='has-text-weight-bold'>{this.props.name}</p>
                    {/* <a class="has-text-right" onClick={this.uploadClick}>Upload</a> */}
                    {/* <div>
                        <input type="file" class="" onClick={this.uploadClick}></input>
                    </div> */}
                    {/* <input type="file" id="new_upload" name="new_upload"></input> */}
                    {/* <div class="file">
                        <label class="file-label">
                            <input onClick={this.uploadClick} id="new_upload_btn" class="file-input" type="file" name="new_upload"></input>
                            <span class="file-cta">
                                <span class="file-label">Upload Submission</span>
                            </span>
                        </label>
                    </div> */}
                    <label class="upload-label has-text-weight-bold has-text-right">
                        Upload Submission
                        <input onClick={this.uploadClick} id={"new_upload_btn_" + this.props.id} class="upload-button" type="file" name="new_upload"></input>
                    </label>
                    <p class="has-text-right">Submissions: {this.props.upload_number}</p>
                </div>
                {/* <a href='#'>Submission Number: {this.props.submission_number} Link: {this.props.link}</a> */}
            </div>
        )
    }
}

class IndvUpload extends React.Component {
    render() {
        return (
            <div id="indv-upload-comp">
                <IndvUploadFile link={this.props.data.upload_info.link}></IndvUploadFile>
            </div>
        )
    }
}

class IndvUploadFile extends React.Component {
    render() {
        return (
            <div className="block">
                <div class="box">
                    <img src={this.props.link}></img>
                </div>
            </div>
        )
    }
}

class Navigation extends React.Component {
    render() {
        return (
            <nav class="navbar" role="navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item">
                            Home
                        </a>

                        <a class="navbar-item">
                            Classes
                        </a>

                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                More
                            </a>

                            <div class="navbar-dropdown">
                                <a class="navbar-item">
                                    About
                                </a>
                                <a class="navbar-item">
                                    Pricing
                                </a>
                                <a class="navbar-item">
                                    Help
                                </a>
                                <hr class="navbar-divider"></hr>
                            </div>
                        </div>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a class="button is-light" href="login.html">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}