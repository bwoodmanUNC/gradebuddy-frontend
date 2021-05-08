class MainList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { join_code: '' }
    }

    renderSubmissionListItems() {
        let all_items = [];
        for (let i = 0; i < this.props.data.length; i++) {
            console.log(this.props.data[i]);
            all_items.push(<SubmissionListItem id={this.props.data[i].id} user_name={this.props.data[i].user_name} is_owned={this.props.is_owned}></SubmissionListItem>);
        }
        return all_items;
    }

    renderAssignmentListItems(is_owned) {
        let all_items = [];
        for (let i = 0; i < this.props.data.length; i++) {
            console.log(this.props.data[i]);
            all_items.push(<AssignmentListItem id={this.props.data[i].id} name={this.props.data[i].name} upload_number={this.props.data[i].num_uploads} is_owned={is_owned}></AssignmentListItem>);
        }
        return all_items;
    }

    renderClassListItems(is_owned) {
        let all_items = [];
        for (let i = 0; i < this.props.data.length; i++) {
            console.log(this.props.data[i]);
            all_items.push(<ClassListItem id={this.props.data[i].id} name={this.props.data[i].name} is_owned={is_owned}></ClassListItem>);
        }
        return all_items;
    }

    joinCodeEdit = (e) => {
        console.log(e.target.value);
        this.setState({ 'join_code': e.target.value });
    }

    joinClass = () => {
        ReactDOM.render(
            <div class="field has-addons">
                <div class="control">
                    <input class="input" type="text" placeholder="Class Code" onChange={this.joinCodeEdit}></input>
                </div>
                <div class="control">
                    <a class="button is-primary" onClick={this.onJoinAction}>Join</a>
                </div>
            </div>
            , document.getElementById('join-class'))
    }

    onJoinAction = () => {
        add_student_to_class(this.state.join_code);
    }

    render() {
        let all_items;
        let title;
        let new_text;
        if (this.props.type === 'submissions') {
            all_items = this.renderSubmissionListItems();
            title = 'Submissions';
            new_text = '';
        } else if (this.props.type === 'assignments') {
            all_items = this.renderAssignmentListItems(this.props.is_owned);
            title = 'Assignments';
            // alert(this.props.is_owned);
            if (this.props.is_owned == 1) {
                new_text = <a class="has-text-right with-arrow" href={"/new_assignment.html?class_id=" + this.props.id}>New Assignment</a>;
            }
        } else if (this.props.type === 'class') {
            all_items = this.renderClassListItems(0);
            title = 'Classes';
            new_text = <a class="has-text-right with-arrow" id="join-class" onClick={this.joinClass}>Join Class</a>;
        } else if (this.props.type === 'owned_class') {
            all_items = this.renderClassListItems(1);
            title = 'Owned Classes';
            new_text = <a class="has-text-right with-arrow" href="/new_class.html">New Class</a>;
        }

        return (
            <div id="main-list">
                <div className="block" id="title">
                    <h1>{title}</h1>
                    {new_text}
                </div>
                <div id='main-list'>
                    {all_items}
                </div>
            </div>

        )
    }
}

class ClassListItem extends React.Component {
    render() {
        return (
            <div class='block'>
                <div class="box submission_list_item">
                    <p class='has-text-weight-bold'>{this.props.name}</p>
                    <a class='has-text-weight-bold has-text-right with-arrow' href={"assignments.html?id=" + this.props.id + "&is_owned=" + this.props.is_owned}>Assignments</a>
                </div>
                {/* <a href='#'>Submission Number: {this.props.submission_number} Link: {this.props.link}</a> */}
            </div>
        )
    }
}

class SubmissionListItem extends React.Component {
    viewAllGradesButton = () => {
        if (this.props.is_owned == 1) {
            return <a class='has-text-weight-bold has-text-right with-arrow' href={"view_grades.html?id=" + this.props.id}>View All Grades</a>;
        } else {
            return '';
        }
    }

    render() {
        return (
            // <div>
            //     <a href='#'>Submission Number: {this.props.submission_number} Link: {this.props.link}</a>
            // </div>
            <div class='block'>
                <div class="box submission_list_item">
                    <p class='has-text-weight-bold'>Submission by {this.props.user_name}</p>
                    {this.viewAllGradesButton()}
                    <a class='has-text-weight-bold has-text-right with-arrow' href={"uploads.html?id=" + this.props.id}>Grade</a>
                </div>
                {/* <a href='#'>Submission Number: {this.props.submission_number} Link: {this.props.link}</a> */}
            </div>
        )
    }
}

class AssignmentListItem extends React.Component {
    uploadClick = async () => {
        const props = this.props;
        document.getElementById('new_upload_btn_' + props.id.toString()).onchange = async function () {
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
                    <div className="list-button">
                        <label class="upload-label has-text-weight-bold has-text-right">
                            Upload Submission
                            <input onClick={this.uploadClick} id={"new_upload_btn_" + this.props.id} class="upload-button" type="file" name="new_upload"></input>
                        </label>
                    </div>
                    <div className="list-button">
                        <a class="button is-primary" href={'/submissions.html?id=' + this.props.id + '&is_owned=' + (this.props.is_owned ? '1' : '0')}>View Submissions: {this.props.upload_number}</a>
                    </div>
                    {/* <p class="has-text-right">Submissions: {this.props.upload_number}</p> */}
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

        const my_grades = this.props.data.grades.filter(x => x.is_me)[0];

        if (my_grades === undefined) {
            return (
                <IndvUploadSidebar overall_grade={0} no_my_grade={true} upload_id={this.props.data.upload_info.id} rubric_items={this.props.data.upload_info.rubric_items}></IndvUploadSidebar>
            )
        } else {
            return (
                <IndvUploadSidebar overall_grade={overall_grade} upload_id={this.props.data.upload_info.id} rubric_items={this.props.data.upload_info.rubric_items} my_grades={my_grades}></IndvUploadSidebar>
            )
        }

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
                    <img src={this.props.link}></img>
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
        if (this.props.no_my_grade) {
            this.state = { current_points: 0, current_rubric_items: [] }
        } else {
            this.state = { current_points: this.calculateCurrentPoints(), current_rubric_items: JSON.parse(this.props.my_grades.selected_rubric_items) };
        }
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
        const selected_rubric_items = this.props.no_my_grade ? [] : this.state.current_rubric_items;
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
        this.setState({ 'current_points': new_points + this.state.current_points });
        this.setState({ 'current_rubric_items': [...this.state.current_rubric_items, added_item] });
        console.log(this.state.current_rubric_items);
    }

    subtractUserScore = (new_points, lost_item) => {
        // let new_points = 0;
        this.setState({ 'current_points': this.state.current_points - new_points });
        this.setState({ 'current_rubric_items': this.state.current_rubric_items.filter(x => x !== lost_item) });
        console.log(this.state.current_rubric_items);
    }

    updateUserScore = async () => {
        // console.log(this.props.my_grades.id);
        if (this.props.no_my_grade) {
            const resp = await new_grade(this.props.upload_id, this.state.current_points / this.current_total_points, JSON.stringify(this.state.current_rubric_items));
            console.log(resp);
        } else {
            const resp = await update_grade(this.props.my_grades.id, this.props.upload_id, this.state.current_points / this.current_total_points, JSON.stringify(this.state.current_rubric_items));
            console.log(resp);
        }
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
            this.setState({ selected: false });
        } else {
            this.props.add_callback(this.props.value, this.props.id);
            this.setState({ selected: true });
        }
        ReactDOM.render(<RubricSaveItem></RubricSaveItem>, document.getElementById('rubric-save-btn-div'));
        // console.log('asdf');
    }

    render() {
        return (
            <div className="block">
                <div className={"box rubric-item " + (this.state.selected ? 'selected-rubric-item' : '')} onClick={this.clicked}>
                    <div><p><strong>{this.props.value}</strong></p></div>
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

class NewAssignmentBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 'rubric_items': [] };

        this.rubric_descriptions = [];
        this.rubric_values = [];
        this.assignment_name = '';

        // this.rubric_items = [];
    }

    newRubricItem = () => {
        this.setState({ 'rubric_items': [...this.state.rubric_items, <NewRubricItem id={this.state.rubric_items.length} onDescriptionUpdate={this.onDescriptionUpdate} onValueUpdate={this.onValueUpdate}></NewRubricItem>] });
        this.rubric_descriptions.push('');
        this.rubric_values.push(0);
    }

    submit = async () => {
        // console.log(this.state.rubric_items[0]);
        let rubric_items = {};
        for (let i = 0; i < this.rubric_descriptions.length; i++) {
            rubric_items[this.rubric_descriptions[i]] = this.rubric_values[i];
        }

        const resp = await new_assignment(this.assignment_name, rubric_items, this.props.class_id);
        // console.log(resp);
        if (resp.status === 200) {
            window.location.replace('/assignments.html?id=' + this.props.class_id)
        }
    }

    onDescriptionUpdate = (id, description) => {
        this.rubric_descriptions[id] = description;
    }

    onValueUpdate = (id, value) => {
        this.rubric_values[id] = value;
    }

    onNameUpdate = (evt) => {
        this.assignment_name = evt.target.value;
    }

    render() {
        // this.newRubricItem();
        return (
            <div className="block">
                <div className="box">
                    <div class="field">
                        <label class="label">Assignment Name</label>
                        <div class="control">
                            <input class="input" type="text" id="name" name="name" onChange={this.onNameUpdate}></input>
                        </div>
                    </div>
                    <div id="rubric-items">
                        {/* <NewRubricItem></NewRubricItem> */}
                        {this.state.rubric_items}
                    </div>
                    <a class="has-text-weight-bold" onClick={this.newRubricItem}>New rubric item +</a>
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-primary" onClick={this.submit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class NewRubricItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'test': 10 };
    }

    onDescriptionUpdate = (evt) => {
        this.props.onDescriptionUpdate(this.props.id, evt.target.value);
    }

    onValueUpdate = (evt) => {
        this.props.onValueUpdate(this.props.id, parseInt(evt.target.value));
    }

    render() {

        return (
            <div className="new-rubric-item">
                <div class="field-label is-normal">
                    <label class="label">Rubric Item #{this.props.id + 1}</label>
                </div>
                <div class="field">
                    <input class="input" type="text" placeholder="Description" onChange={this.onDescriptionUpdate}></input>
                </div>

                <div class="field">
                    <input class="input" type="text" placeholder="Points" onChange={this.onValueUpdate}></input>
                </div>
            </div>
        )
    }
}

class NewClassBox extends React.Component {
    constructor(props) {
        super(props);

        this.class_name = '';
    }

    submit = async () => {
        const resp = await new_class(this.class_name);
        // console.log(resp);
        if (resp.status === 200) {
            window.location.replace('/classes')
        } else if (resp.status === 401) {
            alert('You must be a power user to create a class!');
        }
    }

    onNameUpdate = (evt) => {
        this.class_name = evt.target.value;
    }

    render() {
        // this.newRubricItem();
        return (
            <div className="block">
                <div className="box">
                    <div class="field">
                        <label class="label">Class Name</label>
                        <div class="control">
                            <input class="input" type="text" id="name" name="name" onChange={this.onNameUpdate}></input>
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-primary" onClick={this.submit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Navigation extends React.Component {
    renderLoginArea() {
        // alert(Date.now() > localStorage.accessTokenExpiration);
        if (Date.now() > localStorage.accessTokenExpiration) {
            return (
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
            )
        }
    }

    render() {
        return (
            <nav class="navbar" role="navigation">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <img src="logo.png" width="200" height="80"></img>
                    </a>
                </div>

                <div id="navbarBasicExample">
                    <div class="navbar-start">
                        <a class="navbar-item" href="/classes.html">
                            Student Classes
                        </a>
                        <a class="navbar-item" href="/owned_classes.html">
                            Owned Classes
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
                </div>
                {this.renderLoginArea()}
            </nav>
        )
    }
}

class GradesPage extends React.Component {

    renderRows = () => {
        console.log(this.props.grades)
        let arr = [];
        this.props.grades.forEach(x => {
            arr.push(<GradesRow username={x.username} grade={x.overall_grade}></GradesRow>)
        });
        return arr;
    }

    render() {

        return (
            <div>
                <div className="block" id="title">
                    <h1>Grades</h1>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Overall Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
            
        )
    }
}

class GradesRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.username}</td>
                <td>{(this.props.grade * 100).toString() + '%'}</td>
            </tr>
        )
    }
}