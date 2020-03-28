import React from "react";
import Greetings from "./Greetings";
import "../styles.css";
import {POINT_ADDED, UPDATE_FIELD_POINT, VALIDATION_ERROR} from "../actionTypes";
import agent from '../agent';
import {connect} from 'react-redux';
import InvalidButton from "./InvalidButton";

const mapStateToProps = state => ({
    ...state.points,
    errors: state.common.errors,
});


const mapDispatchToProps = dispatch => ({
    onChangeX: value =>
        dispatch({type: UPDATE_FIELD_POINT, key: 'xc', value}),
    onChangeY: value =>
        dispatch({type: UPDATE_FIELD_POINT, key: 'yc', value}),
    onChangeR: value =>
        dispatch({type: UPDATE_FIELD_POINT, key: 'rc', value}),
    onSubmit: (x, y, r) => {
        dispatch({type: POINT_ADDED, payload: agent.Points.new(x, y, r), r})
    },
    onErrorQ: (err) => {
        dispatch({type: VALIDATION_ERROR, error: err});
    }
});

class PointForm extends React.Component {
    constructor(props) {
        super(props);
        this.submitRef = React.createRef();
        this.state = {
            error: "OK"
        }
    }

    changeX = ev => {
        this.props.onChangeX(ev.target.value);
    };

    changeR = ev => this.props.onChangeR(ev.target.value);

    changeY = ev => {
        const str = ev.target.value;
        const value = str.replace(',', '.');
        if (value.length === 0 || isNaN(value) || +value > 3.0 || +value < -5.0) {
            this.props.onErrorQ('Y должен быть от -5 до 3');
            this.setState({error: "Y должен быть от -5 до 3"});
        } else {
            this.props.onErrorQ(null);
            this.setState({error: "OK"});
        }
        this.props.onChangeY(ev.target.value);
    };

    submitForm = (x, y, r) => ev => {
        ev.preventDefault();
        this.props.onSubmit(x, y, r);
    };

    render() {
        const x = this.props.xc;
        const y = this.props.yc;
        const r = this.props.rc;
        return (
            <div className="top_float">
                <form className="form_div" onSubmit={this.submitForm(x, y, r)}>
                    <div>
                        Выберите значение X:
                            <select id="xValue" onChange={this.changeX}>
                                <option value="-2">-2</option>
                                <option value="-1.5">-1.5</option>
                                <option value="-1">-1</option>
                                <option value="-0.5">-0.5</option>
                                <option selected value="0">0</option>
                                <option value="0.5">0.5</option>
                                <option value="1">1</option>
                                <option value="1.5">1.5</option>
                                <option value="2">2</option>
                            </select>
                    </div>
                    <div>
                        Введите значение Y:<br/>
                        <input maxLength="6" type="text" name="yValue" value={y} onChange={this.changeY}/>
                        <Greetings firstName={y}/>
                    </div>

                    <div>
                        Выберите значение R:
                        <select id="rValue" value={r} onChange={this.changeR}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <InvalidButton refer={this.submitRef} isError={this.state.error}/>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointForm);
