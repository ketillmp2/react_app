import PointForm from "./PointForm";
import ResultTable from "./ResultTable";
import {connect} from 'react-redux';
import React from "react";
import {history} from "../index";
import Graph from "./Graph";
import {POINTS_LOADED} from "../actionTypes";
import agent from "../agent";

const mapStateToProps = state => ({
    points: state.points.points,
    currentUser: state.common.currentUser,
    current_r: state.points.current_r
});

const mapDispatchToProps = dispatch => ({
    onLoad: (payload) =>
        dispatch({type: POINTS_LOADED, payload}),
});

class Main extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentUser) {
            history.push('/main');
        }
    }

    render() {
        if (this.props.points === undefined) {
            this.props.onLoad(agent.Points.all());
        }

        if (this.props.currentUser) {
            if (this.props.points) {
                return (
                    <div className="container4">
                        <div id="content">
                            <PointForm/>
                            <div id="main_photo_div">
                                <Graph/>
                            </div>
                            <ResultTable points={this.props.points} currentUser={this.props.currentUser}
                                         r={this.props.current_r}/>
                        </div>
                    </div>

                );
            } else {
                return (
                    <div className="container4">
                        <div id="content">
                            <PointForm/>
                            <div id="main_photo_div">
                                <Graph/>
                            </div>
                        </div>
                    </div>

                );
            }
        } else {
            return null;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
