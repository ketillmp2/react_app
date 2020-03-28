import { Link } from 'react-router-dom';
import React from 'react';
import agent from "../agent";
import {connect} from "react-redux";
import {LOGOUT} from "../actionTypes";

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="/log" className="nav-link">
                        Войти в лабку
                    </Link>
                </li>
            </ul>
        );
    }
    return null;
};

const LoggedInView = props => {

    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    Давно не виделись, {props.currentUser}!
                </li>

                <li className="nav-item">
                    <Link to="/main" className="nav-link">
                        На главную страницу
                    </Link>
                    <Link to="/"  onClick={props.logout} className="nav-link">
                        Выйти из лабки
                    </Link>
                </li>

            </ul>
        );
    }
    return null;
};

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => {
        dispatch({ type: LOGOUT, payload: agent.Auth.logout() })
    },
});

class MainHeader extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-light ">
                <div className="col-sm-5">

                    <LoggedInView currentUser={this.props.currentUser} logout={this.props.onClickLogout}/>

                    <LoggedOutView currentUser={this.props.currentUser} />

                </div>
            </nav>
        );
    }
}

export default connect(() => ({}), mapDispatchToProps)(MainHeader);
