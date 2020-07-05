import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tasklist from "./TaskList";
import Header from "../Header/Header";
import {LinearProgress} from "@material-ui/core";
import {Alert} from "@material-ui/lab";


class Task extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            task: {
                taskName: null,
                taskStatus: null,
                taskDetails: null,
            },
            completionRatio: null,
            new: [],
            done: [],
            inProgress: [],
            active: false,
            showAlert: false,
        };
        this.onClose = this.onClose.bind(this);
        this.onShow = this.onShow.bind(this);
        this.update = this.update.bind(this);
        this.getTask = this.getTask.bind(this);

    }

    onClose() {
        this.setState({
            active: false
        });
    }

    onShow() {
        this.setState({
            active: true
        });
    }

    async getTask() {
        let response = await fetch("http://localhost:3002/tasks/");
        let json = await response.json();
        return json;
    }

    componentDidMount() {
        let component = this;
        let newTask = [];
        let taskCount;
        let inProgressTask = [];
        let doneTask = [];

        this.getTask().then(function (result) {
            taskCount = result.data.length;
            newTask = result.data.filter(results => results.taskStatus === "new");
            doneTask = result.data.filter(results => results.taskStatus === "done");
            inProgressTask = result.data.filter(results => results.taskStatus === "inProgress");

            let arr = [];
            arr[0] = newTask;
            arr[1] = inProgressTask;
            arr[2] = doneTask;
            arr[3] = taskCount;
            return arr;
        }).then(function (arr) {
            let completedTaskPercentage = (arr[2].length / arr[3]) * 100;

            component.setState({
                new: arr[0],
                inProgress: arr[1],
                done: arr[2],
                completionRatio: completedTaskPercentage
            });

        }).catch(function (err) {
            console.error(err);
        });
    }

    update() {
        this.componentDidMount();
    }

    render() {
        return (
            <div>
                <Header update={this.update}/>
                <React.Fragment> <LinearProgress style={{"height": "8px", "color": "green"}}
                                                 className="bg-danger border-1" variant="determinate"
                                                 value={this.state.completionRatio}/> </React.Fragment>
                <div className="row mt-4">
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-2 md-sm-2">
                        <div className="col-12 list-group-item bg-light ">
                            New <span style={{"float": "right"}}
                                      className="badge pt-1 ml-2 badge-danger">{this.state.new.length}</span>
                        </div>
                        <ul className="list-group">
                            <Tasklist update={this.update} list={this.state.new}/>
                        </ul>

                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-2 md-sm-2">
                        <div className="col-12 list-group-item bg-warning ">
                            In Progress <span style={{"float": "right"}}
                                              className="badge pt-1 ml-2 badge-danger">{this.state.inProgress.length}</span>
                        </div>

                        <ul className="list-group">
                            <Tasklist update={this.update} list={this.state.inProgress}/>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12  mb-2 md-sm-2">
                        <div className="col-12 list-group-item bg-success ">
                            Done <span style={{"float": "right"}}
                                       className="badge pull-right pt-1 ml-2 badge-danger">{this.state.done.length}</span>
                        </div>

                        <ul className="list-group">

                            <Tasklist update={this.update} list={this.state.done}/>

                        </ul>

                    </div>
                </div>
            </div>)
    }
}

export default Task;





