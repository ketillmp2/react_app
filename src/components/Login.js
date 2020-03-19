import React from "react";
import "../styles2.css"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <span className="dom">Универси<span className="sgovnom">тетitmo</span></span>
                <div id="id01" className="modal">
        <span onClick={hideDisplay}
              className="close" title="Close Modal">&times;</span>
                    <div className="modal-content animate">
                        <form>
                            <div className="container">
                                <label htmlFor='uname'><b>Username</b></label>
                                <input maxLength="50" type="text" placeholder="Enter Username" name="uname" id="uname" required/>

                                <label htmlFor="psw"><b>Password</b></label>
                                <input maxLength="50" type="password" placeholder="Enter Password" name="psw" id="psw" required/>
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
    document.getElementById('id01').style.display='none';
}

function showDisplay() {
    document.getElementById('id01').style.display='block';
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
window.onclick = function(event) {
    let modal = document.getElementById('id01');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


export default Login;
