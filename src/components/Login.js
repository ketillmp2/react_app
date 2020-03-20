import React from "react";
import "../styles2.css"
import {LOGIN, UPDATE_FIELD_AUTH} from "../actionTypes";
import agent from '../agent';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    ...state.auth,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onChangeUsername: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'username', value}),
    onChangePassword: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'password', value}),
    onSubmit: (username, password) =>
        dispatch({type: LOGIN, payload: agent.Auth.login(username, password), username})
});

class Login extends React.Component {

    changePassword = ev => this.props.onChangePassword(ev.target.value);

    changeUsername = ev => this.props.onChangeUsername(ev.target.value);

    submitForm = (username, password) => ev => {
        ev.preventDefault();
        this.props.onSubmit(username, password);
    };

    render() {
        return (
            <div>
                <span className="dom">Универси<span className="sgovnom">тетitmo</span></span>
                <div id="id01" className="modal">
                    <span onClick={hideDisplay} className="close" title="Close Modal">&times;</span>
                    <div className="modal-content animate">
                        <form onSubmit={this.submitForm(this.props.username, this.props.password)}>
                            <div className="container">
                                <label htmlFor='uname'><b>Username</b></label>
                                <input maxLength="50" type="text" value={this.props.username}
                                       placeholder="Enter Username" name="uname" id="uname" required/>
                                <label htmlFor="psw"><b>Password</b></label>
                                <input maxLength="50" type="password" value={this.props.password}
                                       placeholder="Enter Password" name="psw" id="psw" required/>
                                <label><input type="checkbox" onClick={showPass}/>Show password</label>
                                <button type="submit">Login</button>
                            </div>
                        </form>
                        <div className="container" style={{backgroundColor: "#f1f1f1"}}>
                            <button type="button" onClick={hideDisplay}
                                    className="cancelbtn">Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <button id="login" className="ui-button"
                        onClick={showDisplay}>┬┴┬┴┤(･_├┬┴┬┴
                </button>
            </div>
        );
    }
}

function hideDisplay() {
    document.getElementById('id01').style.display = 'none';
}

function showDisplay() {
    document.getElementById('id01').style.display = 'block';
}

function showPass() {
    let pass = document.getElementById("psw");
    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    let modal = document.getElementById('id01');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
