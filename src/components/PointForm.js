import React from "react";
import Greetings from "./Greetings";
import Graph from "./Graph";
import "../styles.css";
import {POINT_ADDED, UPDATE_FIELD_POINT, VALIDATION_ERROR} from "../actionTypes";
import agent from '../agent';
import { connect } from 'react-redux';
import Errors from "./Errors";

const mapStateToProps = state => ({
    ...state.points,
    errors: state.common.errors,
});


const mapDispatchToProps = dispatch => ({
    onChangeX: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'xc', value }),
    onChangeY: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'yc', value }),
    onChangeR: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'rc', value }),
    onSubmit: (x, y, r) => {
        dispatch({ type: POINT_ADDED, payload: agent.Points.new(x, y, r), r})
    },
    onError: (err) => {
        dispatch({ type: VALIDATION_ERROR, error: err });
    }
});

class PointForm extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            rValue: 1
        };
        this.submitRef = React.createRef();
    }

    changeX = ev => this.props.onChangeX(ev);

    changeY = ev => {
        const y = ev.target.value;
        const regex = /[0-9]/;
        if (!regex.test(y)) {
            this.props.onError("Y должен быть числом от -5 до 3");
        }
        let y1 = parseFloat(y.replace(/,/, '.'));
        if ((y1 < -5) || (y1 > 3) || Number.isNaN(y1)) {
            this.props.onError("Y должен быть числом от -5 до 3");
        }
        this.props.onError(null);
        this.props.onChangeY(ev.target.value);
    };

    submitForm = (x, y, r) => ev => {
        ev.preventDefault();
        this.props.onSubmit(x, y, r);
    };

    changeR(event){
        this.setState({rValue: event.target.value});
        this.props.onChangeR(event);
    }

    render() {
        const x = this.props.xc;
        const y = this.props.yc;
        const r = this.props.rc;
        const {yError} = this.state;
        return (
            <div className="top_float">
                <Errors errors={this.props.errors} />
                <form className="form_div" onSubmit={this.submitForm(x, y, r)}>
                    <div>
                        Выберите значение X:
                        <select onSelect={this.changeX}>
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

                        {yError && <div>{yError}</div>}

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
                    <button ref={this.submitRef} disabled={this.props.errors} type="submit">Влупить!</button>
                </form>

                <div id="main_photo_div">
                    <Graph radius={this.state.rValue}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointForm);
