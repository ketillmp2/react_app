import React from "react";
import "../styles.css";
import { connect } from 'react-redux';
import agent from "../agent";
import {POINT_ADDED, POINTS_RECALCULATED} from "../actionTypes";

const mapStateToProps = state => ({
    points: state.points.points_r,
    rc: state.points.rc,
    current_r: state.points.current_r
});

const mapDispatchToProps = dispatch => ({
    recalculatedPoints: (r) => {
        dispatch({ type: POINTS_RECALCULATED, payload: agent.Points.recalculated(r), r})
    },
    onCanvasClick: (x, y, r) => {
        dispatch({ type: POINT_ADDED, payload: agent.Points.new(x, y, r), r})
    }
});

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorValue: "#FC88DA",
            oppositeColor: "#00FF00",
            missColor: "#FF0000"
        };
        this.setColor = this.setColor.bind(this);
        this.addPointFromCanvas = this.addPointFromCanvas.bind(this);
    }

    componentWillMount() {
        this.props.recalculatedPoints(1);
    }

    componentDidMount() {
        drawGraph(1);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.rc) {
            drawGraph(nextProps.rc);
            if (!nextProps.current_r || nextProps.current_r !== nextProps.rc)
                this.props.recalculatedPoints(nextProps.rc);
        }
        if (nextProps.points) {
            nextProps.points.map(point => drawPoint(point.r, point.x, point.y, point.result));
        }
    }

    setColor(event) {
        let color = "#FC88DA";
        let oppositeColor = "#00FF00";
        let randomColor = Math.floor(Math.random() * 16777215);
        let oppositeRandom = 16777215 - randomColor;
        randomColor = randomColor.toString(16);
        oppositeRandom = oppositeRandom.toString(16);
        color = "#" + randomColor;
        oppositeColor = "#" + oppositeRandom;
        this.setState({colorValue: color, oppositeColor: oppositeColor, missColor: color});
    }

    mousePosition(evt) {
        let r = document.getElementById("graphRadius").value;
        let canvas = document.getElementById("canvas");
        let width = canvas.getAttribute("width");
        let height = canvas.getAttribute("height");
        let position = getMousePosition(canvas, evt);
        let xCoordinate = ((position.x - width/2) / 100 * r).toFixed(5);
        let yCoordinate = ((height/2 - position.y) / 100 * r).toFixed(5);
        console.log("X position:" + position.x);
        console.log("Y position:" + position.y);
        console.log("X coordinate:" + xCoordinate);
        console.log("Y coordinate:" + yCoordinate);
        this.props.onCanvasClick(xCoordinate, yCoordinate, this.props.rc || 1);
    }

    render() {
        return (
            <div>
                <canvas id="canvas" width="300" height="300" onMouseEnter={this.setColor}
                        onClick={this.mousePosition}/>
                <input type="hidden" id="graphColor" value={this.state.colorValue}/>
                <input type="hidden" id="c1" value={this.state.oppositeColor}/>
                <input type="hidden" id="c2" value={this.state.missColor}/>
                <input type="hidden" id="graphRadius" value={this.props.radius}/>
            </div>
        );
    }
}

function drawPoint(r, x, y, hit) {
    let c1 = document.getElementById("c1");
    let c2 = document.getElementById("c2");
    let canvas = document.getElementById("canvas");
    let width = canvas.getAttribute("width");
    let height = canvas.getAttribute("height");
    let ctx = canvas.getContext("2d");
    let xCoordinate = width/2 + ((x * (width / 3)) / r);
    let yCoordinate = height/2 - ((y * (height / 3)) / r);
    console.log("Drawing point: " + xCoordinate + " " + yCoordinate);
    if (hit) {
        ctx.fillStyle = c1;
    } else {
        ctx.fillStyle = c2;
    }
    ctx.beginPath();
    ctx.arc(xCoordinate, yCoordinate, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function getMousePosition(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function drawGraph(r){
    let color = document.getElementById("graphColor").value;
    let canvas = document.getElementById("canvas");
    let width = canvas.getAttribute("width");
    let height = canvas.getAttribute("height");
    let ctx = canvas.getContext("2d");
    ctx.font = "13px Ravi Prakash";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    console.log("Drawing graph for r = " + r);
    //Clear
    ctx.clearRect(0, 0, width, height);

    //Drawing rectangle
    ctx.fillStyle = color;
    ctx.fillRect(width / 6, 3*height / 6, width / 3, height / 3);

    //Drawing triangle
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo((width / 2) + (width / 6), height / 2);
    ctx.lineTo(width / 2, height - (height / 6));
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    ctx.closePath();

    //drawing 1/4 of circle
    ctx.beginPath();
    ctx.moveTo(width / 6, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.lineTo(width / 2, (height / 6));
    ctx.arc(width / 2, height / 2, 2 * (width / 6), Math.PI, -Math.PI/2, false);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "#000000";
    //Drawing arrows
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2 + 7, 7);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2 - 7, 7);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width, height / 2);
    ctx.lineTo(width - 7, height / 2 - 7);
    ctx.moveTo(width, height / 2);
    ctx.lineTo(width - 7, height / 2 + 7);
    ctx.font = "16px Ravi Prakash";
    ctx.fillText("X", width - 10, height / 2 - 13);
    ctx.fillText("Y", width / 2 + 15, 10);
    ctx.font = "13px Ravi Prakash";
    ctx.closePath();
    ctx.stroke();

    //Drawing lines
    ctx.beginPath();
    ctx.moveTo(width / 2 - 4, height - (height / 6));
    ctx.lineTo(width / 2 + 4, height - (height / 6));
    ctx.fillText("-" + (r).toString(), width / 2 + 7, height - (height / 6) + 5);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 - 4, height - 2 * (height / 6));
    ctx.lineTo(width / 2 + 4, height - 2 * (height / 6));
    ctx.fillText("-" + (r / 2).toString(), width / 2 + 7, height - 2 * (height / 6) + 5);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 - 4, height - 4 * (height / 6));
    ctx.lineTo(width / 2 + 4, height - 4 * (height / 6));
    ctx.fillText((r / 2).toString(), width / 2 + 7, height - 4 * (height / 6) + 5);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 - 4, height - 5 * (height / 6));
    ctx.lineTo(width / 2 + 4, height - 5 * (height / 6));
    ctx.fillText((r).toString(), width / 2 + 7, height - 5 * (height / 6) + 5);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - (width / 6), height / 2 - 4);
    ctx.lineTo(width - (width / 6), height / 2 + 4);
    ctx.fillText((r).toString(), width - (width / 6) - 4, height / 2 + 14);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 2 * (width / 6), height / 2 - 4);
    ctx.lineTo(width - 2 * (width / 6), height / 2 + 4);
    ctx.fillText((r / 2).toString(), width - 2 * (width / 6) - 3, height / 2 + 14);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 4 * (width / 6), height / 2 - 4);
    ctx.lineTo(width - 4 * (width / 6), height / 2 + 4);
    ctx.fillText("-" + (r / 2).toString(), width - 4 * (width / 6) - 7, height / 2 + 14);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 5 * (width / 6), height / 2 - 4);
    ctx.lineTo(width - 5 * (width / 6), height / 2 + 4);
    ctx.fillText("-" + (r).toString(), width - 5 * (width / 6) - 6, height / 2 + 14);
    ctx.closePath();
    ctx.stroke();
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
