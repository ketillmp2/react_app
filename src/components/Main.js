import PointForm from "./PointForm";
import ResultTable from "./ResultTable";
import { connect } from 'react-redux';
import React from "react";
import {history} from "../index";

const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser,
});

class Main extends React.Component{

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentUser) {
            history.push('/');
        }
    }

    render() {
        if (this.props.currentUser) {
            return (
                <div className="container">
                    <div id="content">
                        <PointForm/>
                        <ResultTable points={this.props.points} currentUser={this.props.currentUser} r={this.props.current_r}/>
                    </div>
                </div>

            );
        }else {
            return null;
        }
    }
}

export default connect(mapStateToProps)(Main);
