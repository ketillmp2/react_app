import React from "react";
import PointForm from "./PointForm";
import ResultTable from "./ResultTable"
import "../styles.css";
import Header from "./Header";

const App = () => (
    <div className="container">
        <div id="header_div">
            <Header username="Иван"/>
        </div>
        <div id="content">
                <PointForm/>
                <ResultTable/>
        </div>
    </div>
);


export default App;
