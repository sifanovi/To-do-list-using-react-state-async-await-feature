import React , {useState} from "react";
import {Dropdown} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import Dialogue from "./Taskform";
import Moment from "react-moment";
import {Alert} from "@material-ui/lab";

function Tasklist(props) {
    const[showAlert,setAlertStatus]=useState(false);
    const[alertTitle,setAlertTitle]=useState('');
    const[alertSeverity,setAlertseverity]=useState('');

    const onDelete = (e) => {
        fetch("http://localhost:3002/tasks/" + e.target.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",

            }
        }).then(function (result) {
            return result.json();
        }).then(function (result) {
            setAlertTitle(result.message);
            setAlertseverity("success");
            setAlertStatus(true);
            props.update();
            setTimeout(function () {
                setAlertStatus(false);
            }, 1000);
            console.log(result.message);
        }).catch(function (err) {
            setAlertTitle(err);
            setAlertseverity("error");
            setAlertStatus(true);
            setTimeout(function () {
                setAlertStatus(false);
            }, 1000);
        });
    }
    const onLabelUpdated = (e) => {

        fetch("http://localhost:3002/tasks/" + e.target.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                taskStatus: e.target.dataset.status,

            })
        }).then(function (result) {
            return result.json();
        }).then(function (result) {
            setAlertTitle(result.message);
            setAlertseverity("success");
            setAlertStatus(true);
            props.update();
            setTimeout(function () {
                setAlertStatus(false);
            }, 1000);
            console.log(result.message);
        }).catch(function (err) {
            setAlertTitle(err);
            setAlertseverity("error");
            setAlertStatus(true);
            setTimeout(function () {
                setAlertStatus(false);
            }, 1000);
        });
    }
    return (
        <div>


            {showAlert && <div><Alert severity={alertSeverity}>{alertTitle}</Alert></div>}

            <div style={{
                            "maxHeight": "500px",
                            "overflowY": "auto",
                            "overflowX": "hidden",
                            "minHeight": "300px"
                        }}
                 >
            {props.list.map((value, index) => {
                return <li key={value.id} className="list-group-item">
                    <div className="row">
                        <div className="col-9">
                            <div className="alert alert-heading" role="alert">
                                <h4 className="alert-heading">{value.taskName.substring(0, 13)} {value.taskName.length > 12 ? "..." : ''}</h4>
                                <p>{value.taskDetails.substring(0, 50)} {value.taskDetails.length > 50 ? "..." : ''}</p>
                                <p><small>Last updated at</small> {value.taskStatus === "new" ?
                                    <Moment format="DD/MM/YYYY hh:mm A">{value.createdAt}</Moment> :
                                    <Moment format="DD/MM/YYYY hh:mm A">{value.updatedAt}</Moment>}</p>

                            </div>
                        </div>
                        <div className="col-12 pl-4">
                            <Dropdown className="col-12">
                                <Dropdown.Toggle className="col-12">
                                    <Icon.CardList/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dialogue update={props.update} id={value.id}/>
                                    <Dropdown.Item className="bg-transparent border-0" onClick={onDelete.bind(this)}
                                                   id={value.id}>Delete</Dropdown.Item>
                                    {value.taskStatus != "inProgress" &&

                                    < Dropdown.Item className="bg-transparent border-0 "
                                                    onClick={onLabelUpdated.bind(this)}
                                                    data-status="inProgress" id={value.id}>In
                                        Progress</Dropdown.Item>
                                    }
                                    {value.taskStatus != "done" &&
                                    <Dropdown.Item className="bg-transparent border-0"
                                                   onClick={onLabelUpdated.bind(this)}
                                                   data-status="done" id={value.id}>Done</Dropdown.Item>
                                    }
                                    {value.taskStatus != "new" &&
                                    <Dropdown.Item className="bg-transparent border-0"
                                                   onClick={onLabelUpdated.bind(this)}
                                                   data-status="new" id={value.id}>New</Dropdown.Item>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </li>

            })}
            </div>
        </div>)}

export default Tasklist;
