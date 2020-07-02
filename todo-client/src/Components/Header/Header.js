import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialogue from "../Task/Taskform";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar variant="elevation" color="transparent" position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Your To-do list
                    </Typography>
                    <Dialogue update={props.update}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
