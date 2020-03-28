import React from 'react';
import "../styles.css";

class InvalidButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.isError === "OK") {
            return (
                <div>
                    <button ref={this.props.refer} type="submit">Влупить!</button>
                </div>
            );
        }else{
            return (
                <div style={{backgroundColor: "red"}}>
                    {this.props.isError}
                </div>
            );
        }
    }
}

export default InvalidButton;
