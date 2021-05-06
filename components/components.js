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
    renderSidebar() {
        let overall_grade = 0.0;
        this.props.data.grades.forEach(x => {
            overall_grade += x.overall_grade;
        });

        overall_grade = overall_grade / this.props.data.grades.length * 100;

        return (
            <IndvUploadSidebar overall_grade={overall_grade} rubric_items={this.props.data.upload_info.rubric_items} my_grades={this.props.data.grades.filter(x => x.is_me)[0]}></IndvUploadSidebar>
        )
    }

    render() {
        return (
            <div id="indv-upload-comp">
                <IndvUploadFile link={this.props.data.upload_info.link}></IndvUploadFile>
                {this.renderSidebar()}
            </div>
        )
    }
}

class IndvUploadFile extends React.Component {
    render() {
        return (
            <div className="block">
                <div class="box">
                    {/* <img src={this.props.link}></img> */}
                </div>
            </div>
        )
    }
}

class IndvUploadSidebar extends React.Component {
    constructor(props) {
        super(props);
        let reducer = (accumulator, item) => {
            // console.log(item.overall_grade);
            return accumulator + item;
        }
        this.state = {current_points: this.calculateCurrentPoints(), current_rubric_items: JSON.parse(this.props.my_grades.selected_rubric_items)};
        console.log(this.state.current_rubric_items);
        this.current_total_points = Object.values(JSON.parse(this.props.rubric_items)).reduce(reducer);
    }

    calculateCurrentPoints() {
        let current_points = 0;

        const rubric_dict = JSON.parse(this.props.rubric_items);
        let rubric_vals = [];
        for (let item in rubric_dict) {
            rubric_vals.push(rubric_dict[item]);
        }

        const selected_rubric_items = JSON.parse(this.props.my_grades.selected_rubric_items);
        selected_rubric_items.forEach(x => {
            current_points += rubric_vals[x];
            console.log(current_points);
        })
        return current_points;
    }

    renderRubricItems() {
        const selected_rubric_items = this.state.current_rubric_items;
        console.log(selected_rubric_items);
        const rubric_dict = JSON.parse(this.props.rubric_items);
        let rubric_list = [];
        let i = 0;
        for (let item in rubric_dict) {
            // console.log(item.key);
            rubric_list.push(<RubricItem name={item} value={rubric_dict[item]} selected={selected_rubric_items.includes(i)} add_callback={this.addUserScore} subtract_callback={this.subtractUserScore} id={i}></RubricItem>);
            i++;
        }
        return rubric_list;
    }

    addUserScore = (new_points, added_item) => {
        // let new_points = 0;
        this.setState({'current_points': new_points + this.state.current_points});
        this.setState({'current_rubric_items': [...this.state.current_rubric_items, added_item]});
        console.log(this.state.current_rubric_items);
    }

    subtractUserScore = (new_points, lost_item) => {
        // let new_points = 0;
        this.setState({'current_points': this.state.current_points - new_points});
        this.setState({'current_rubric_items': this.state.current_rubric_items.filter(x => x !== lost_item)});
        console.log(this.state.current_rubric_items);
    }

    render() {
        // maybe move to constructor?
        this.all_rubric_items_list = this.renderRubricItems();
        //
        return (
            <div className="block indv-upload-sidebar">
                <div class="box">
                    <div className="block">
                        <h1>Class Grade: <strong>{this.props.overall_grade}%</strong></h1>
                        <h1>Your Grade: <strong>{this.state.current_points / this.current_total_points * 100}%</strong></h1>
                    </div>
                    {this.all_rubric_items_list}
                    <div id="rubric-save-btn-div" onClick={this.updateUserScore}></div>
                </div>
            </div>
        )
    }
}

class RubricItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.state.selected = this.props.selected;
    }

    clicked = () => {
        if (this.state.selected) {
            this.props.subtract_callback(this.props.value, this.props.id);
            this.setState({selected: false});
        } else {
            this.props.add_callback(this.props.value, this.props.id);
            this.setState({selected: true});
        }
        ReactDOM.render(<RubricSaveItem></RubricSaveItem>, document.getElementById('rubric-save-btn-div'));
        // console.log('asdf');
    }

    render() {
        return (
            <div className="block">
                <div className={"box rubric-item " + (this.state.selected ? 'selected-rubric-item' : '')} onClick={this.clicked}>
                    <div><p>{this.props.value}</p></div>
                    <div><p>{this.props.name}</p></div>
                </div>
            </div>
        )
    }
}

class RubricSaveItem extends React.Component {
    render() {
        return (
            <button class="button is-primary">Save</button>
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