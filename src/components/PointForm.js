import React from "react";
import Greetings from "./Greetings";
import Graph from "./Graph";
import "../styles.css";

class PointForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            yValue: "",
            yError: "",
            rValue: 1
        };
        this.changeR = this.changeR.bind(this);
    }

    validateY = y => {
        const regex = /[0-9]/;
        if (!regex.test(y)) {
            return "Invalid value of Y";
        }
        let y1 = parseFloat(y.replace(/,/, '.'));
        if ((y1 < -5) || (y1 > 3) || Number.isNaN(y1)) {
            return "Invalid value of Y";
        }
        return y1;
    };

    onFirstNameChange = event =>
        this.setState({
            yValue: event.target.value
        });

    onFirstNameBlur = () => {
        let {yValue} = this.state;

        let yError = this.validateY(yValue);

        if (yError !== "Invalid value of Y") {
            yValue = yError;
            yError = "";
        } else {
            yValue = "";
        }

        return this.setState({yError: yError, yValue: yValue});
    };

    handleSubmit(event){
        event.preventDefault();
    }

    changeR(event){
        this.setState({rValue: event.target.value});
    }

    render() {
        const {yError} = this.state;
        return (
            <div className="top_float">
                <form className="form_div" onSubmit={this.handleSubmit}>
                    <div>
                        Выберите значение X:
                        <select>
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
                        <input maxLength="6" type="text" name="yValue" value={this.state.yValue} onChange={this.onFirstNameChange}
                               onBlur={this.onFirstNameBlur}/>

                        {yError && <div>{yError}</div>}

                        <Greetings firstName={this.state.yValue}/>
                    </div>

                    <div>
                        Выберите значение R:
                        <select id="rValue" value={this.state.rValue} onChange={this.changeR}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <input type="submit"/>
                </form>

                <div id="main_photo_div">
                    <Graph radius={this.state.rValue}/>
                </div>
            </div>
        );
    }
}

export default PointForm;
