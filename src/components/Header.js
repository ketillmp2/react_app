import React from "react";
import "../styles.css";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return(
          <div>
              Добро пожаловать к нам в лабку, {this.props.username}!<br/>
              <button>УБЕЖАТЬ</button>
          </div>
        );
    }
}
export default Header;
