import React from 'react';
import "../styles.css";

class TableRow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <tbody>
            <tr>
                <td>{this.props.point.id}</td>
                <td>{this.props.point.x}</td>
                <td>{this.props.point.y}</td>
                <td>{this.props.point.r}</td>
                <td>{this.props.point.hit}</td>
            </tr>
            </tbody>
        );
    }
}

export default TableRow;
