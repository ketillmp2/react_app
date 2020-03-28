import React from "react";
import "../styles.css";
import {connect} from 'react-redux';
import agent from "../agent";
import {POINT_ADDED, POINTS_RECALCULATED} from "../actionTypes";

const mapStateToProps = state => ({
    points: state.points.points_r,
    rc: state.points.rc,
    current_r: state.points.current_r
});

const mapDispatchToProps = dispatch => ({
    recalculatedPoints: (r) => {
        dispatch({type: POINTS_RECALCULATED, payload: agent.Points.recalculated(r), r})
    },
    onCanvasClick: (x, y, r) => {
        dispatch({type: POINT_ADDED, payload: agent.Points.new(x, y, r), r})
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
        this.mousePosition = this.mousePosition.bind(this);
        this.drawPoint = this.drawPoint.bind(this);
        this.invertColor = this.invertColor.bind(this);
        this.drawGraph = this.drawGraph.bind(this);
    }

    componentWillMount() {
        this.props.recalculatedPoints(1);
    }

    componentDidMount() {
        this.drawGraph(1);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rc) {
            this.drawGraph(nextProps.rc);
            if (!nextProps.current_r || nextProps.current_r !== nextProps.rc)
                this.props.recalculatedPoints(nextProps.rc);
        }
        if (nextProps.points) {
            nextProps.points.map(point => this.drawPoint(point.r, point.x, point.y, point.hit));
        }
    }

    setColor() {
        let color = "#FC88DA";
        let oppositeColor = "#00FF00";
        let randomColor = Math.floor(Math.random() * 16777215);
        randomColor = randomColor.toString(16);
        color = "#" + randomColor;
        oppositeColor = this.invertColor(color, false);
        this.setState({colorValue: color, oppositeColor: oppositeColor});
    }

    padZero(str, len) {
        len = len || 2;
        let zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

    invertColor(hex, bw) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        let r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '#000000'
                : '#FFFFFF';
        }
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
    }

    drawGraph(r) {
        let canvas = document.getElementById("canvas");
        let pointRadius = document.getElementById("pointRadius");
        if (window.matchMedia("(max-width: 500px)").matches) {
            let h = document.getElementById("")
            canvas.setAttribute("width", "300");
            canvas.setAttribute("height", "300");
            pointRadius.value = "3";
        } else {
            if (window.matchMedia("(min-width: 705px) and (max-width: 1106px)").matches) {
                canvas.setAttribute("width", "300");
                canvas.setAttribute("height", "300");
                pointRadius.value = "3";
            }else{
                if (window.matchMedia("(min-width: 500px) and (max-width: 705px)").matches) {
                    canvas.setAttribute("width", "300");
                    canvas.setAttribute("height", "300");
                    pointRadius.value = "3";
                }else {
                    canvas.setAttribute("width", "300");
                    canvas.setAttribute("height", "300");
                    pointRadius.value = "3";
                }
            }
        }
        let color = this.state.colorValue;
        let width = canvas.getAttribute("width");
        let height = canvas.getAttribute("height");
        console.log("width: " + width + ", height: " + height);
        let ctx = canvas.getContext("2d");
        ctx.font = "13px Ravi Prakash";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        //Clear
        ctx.clearRect(0, 0, width, height);

        //Drawing rectangle
        ctx.fillStyle = color;
        ctx.fillRect(width / 6, 3 * height / 6, width / 3, height / 3);

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
        ctx.arc(width / 2, height / 2, 2 * (width / 6), Math.PI, -Math.PI / 2, false);
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

    mousePosition(evt) {
        this.setColor();
        let r = document.getElementById("graphRadius").value;
        let canvas = document.getElementById("canvas");
        let width = canvas.getAttribute("width");
        let height = canvas.getAttribute("height");
        let position = getMousePosition(canvas, evt);
        let xCoordinate = ((position.x - width / 2) / 100 * r).toFixed(5);
        let yCoordinate = ((height / 2 - position.y) / 100 * r).toFixed(5);
        this.props.onCanvasClick(xCoordinate, yCoordinate, this.props.rc || 1);
    }

    render() {
        let className = "container d-flex justify-content-center";
        return (
            <div className={className}>
                <canvas ref={node => this.graphic = node} id="canvas"
                        onClick={this.mousePosition}/>
                <input type="hidden" id="graphRadius" value={this.props.rc}/>
                <input type="hidden" id="graphColor" value={this.state.colorValue}/>
                <input type="hidden" id="pointRadius" value="3"/>
            </div>
        );
    }

    drawPoint(r, x, y, hit) {
        let canvas = document.getElementById("canvas");
        let width = canvas.getAttribute("width");
        let height = canvas.getAttribute("height");
        let pointRadius = document.getElementById("pointRadius").value;
        let ctx = canvas.getContext("2d");
        let xCoordinate = width / 2 + ((x * (width / 3)) / r);
        let yCoordinate = height / 2 - ((y * (height / 3)) / r);
        if (hit) {
            ctx.fillStyle = this.state.oppositeColor;
        } else {
            ctx.fillStyle = this.state.colorValue;
        }
        ctx.beginPath();
        ctx.arc(xCoordinate, yCoordinate, pointRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

function getMousePosition(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Graph);
