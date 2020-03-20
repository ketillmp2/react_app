import React from 'react';

class Errors extends React.Component {
    render() {
        const errors = this.props.errors;
        let className = "container d-flex justify-content-center";
        if (errors) {
            return (
                <div className={className}>
                    <ul className="error-messages">
                        <li key={errors}>
                            {errors}
                        </li>
                    </ul>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Errors;
