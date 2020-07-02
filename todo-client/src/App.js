import React, {Component} from 'react';
import './index.css';
import Task from "./Components/Task/Task";


class App extends Component {


    render() {

        return (

            <div>
                <div className="App container">
                    <Task/>
                </div>
            </div>
        );

    }
};

export default App;
