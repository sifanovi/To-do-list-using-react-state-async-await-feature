import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PostAdd from '@material-ui/icons/PostAdd';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import {Dropdown} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from "@hookform/error-message";


export default function DialogSelect(props) {

    const {register, handleSubmit, errors} = useForm({
        criteriaMode: "all",

    });

    const [open, setOpen] = useState(false);
    const [formStatus, updateFormStatus] = useState(false);
    const [taskName, taskname] = useState("");
    const [taskDetails, taskdetails] = useState("");
    const [taskStatus, taskstatus] = useState("new");

    const [detailsCharacterLimit, setDetailsCharacterLimit] = useState(500)


    const getItem = () => {
        fetch("http://localhost:3002/tasks/" + props.id).then(function (res) {
            return res.json();
        }).then(function (result) {

            taskname(result.data.taskName);
            taskdetails(result.data.taskDetails);
            taskstatus(result.data.taskStatus);
            let initialLimit = 500 - result.data.taskDetails.length;
            setDetailsCharacterLimit(initialLimit);
        });
    }

    const updateTask = (id) => {
        fetch("http://localhost:3002/tasks/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                taskName: taskName,
                taskStatus: taskStatus,
                taskDetails: taskDetails
            })
        }).then(function (result) {
            handleClose();
            props.update();

            taskname("");
            taskstatus("new");
            taskdetails("");
        });

    }
    const addTask = () => {

        fetch("http://localhost:3002/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                taskName: taskName,
                taskStatus: taskStatus,
                taskDetails: taskDetails
            })
        }).then(function (result) {
            handleClose();
            props.update();

            taskname("");
            taskstatus("new");
            taskdetails("");


        });
    }
    const handleClickOpen = () => {
        setOpen(true);
        if (props.id) {
            getItem();
        }
    };

    const handleClose = () => {
        setOpen(false);
        taskname("");
        taskstatus("new");
        taskdetails("");
        updateFormStatus(false);

    };
    const onsubmit = () => {

        if (props.id) {
            handleSubmit(updateTask(props.id));

        } else {
            handleSubmit(addTask());


        }
    }
    return (
        <div>
            {props.id ? <Dropdown.Item onClick={handleClickOpen}> Update </Dropdown.Item> :
                <Button className="text-white" onClick={handleClickOpen}> <PostAdd/> Add Task </Button>}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> {props.id ? <span> <Edit/> Update Task </span> :
                    <span> <Add/> Add Task </span>} </DialogTitle>
                <DialogContent>
                    <form className="row">
                        <div className="form-group col-sm-12 ">
                            <div className="col-sm-3">
                                <label htmlFor="Task Name"
                                       className="col-form-label">Title</label>
                            </div>
                            <div className="col-sm-9">
                                <textarea
                                    name="title" rows="5"
                                    ref={register({
                                        required: "This field is required.",
                                        maxLength: {
                                            value: 30,
                                            message: "Write your task title within 30 characters"
                                        }
                                    })}
                                    onChange={event => {
                                        updateFormStatus(true);
                                        taskname(event.target.value)
                                    }}
                                    defaultValue={taskName}
                                    className="form-control bg-transparent"
                                    placeholder="Enter name"></textarea>
                                <ErrorMessage
                                    errors={errors}
                                    name="title"
                                    render={({messages}) => {
                                        return messages
                                            ? Object.entries(messages).map(([type, message]) => (
                                                <small className="text-danger" key={type}>{message}</small>
                                            ))
                                            : null;
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group col-sm-12">
                            <label htmlFor="Task Details" className="col-sm-2 col-form-label">Details</label>
                            <div className="col-sm-9">
                                    <textarea
                                        name="details"
                                        rows="10"
                                        defaultValue={taskDetails}
                                        onChange={event => {
                                            updateFormStatus(true);
                                            taskdetails(event.target.value);
                                            setDetailsCharacterLimit(500 - taskDetails.length);
                                        }}
                                        placeholder="Enter details" className="form-control"
                                        ref={register({
                                            required: "This field is required.",
                                            maxLength: {
                                                value: 500,
                                                message: "Write your details within 500 characters"
                                            }
                                        })}
                                    />
                                <ErrorMessage
                                    errors={errors}
                                    name="details"
                                    render={({messages}) => {
                                        return messages ? Object.entries(messages).map(([type, message]) => (
                                            <small className="text-danger" key={type}>{message}</small>
                                        )) : null;
                                    }}
                                />
                                <p><small>  {taskDetails.length > 0 ? detailsCharacterLimit : 500} characters
                                    remaining</small></p>
                            </div>
                        </div>
                        <div className="form-group col-sm-12">
                            <label htmlFor="Task Status" className="col-sm-2 col-form-label">Status</label>
                            <div className="col-sm-9">
                                <select onChange={event => {
                                    updateFormStatus(true);
                                    taskstatus(event.target.value)
                                }} className="form-control"
                                        value={taskStatus}>
                                    <option value="new">New</option>
                                    <option value="inProgress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    {formStatus &&
                    <div className="text-center"><Button variant="contained" onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                        <Button className="ml-2" onClick={handleSubmit(onsubmit)} variant="contained"
                                color="primary">{props.id ? 'Update' : 'Create'}</Button></div>}
                </DialogActions>
            </Dialog>
        </div>
    );
}

