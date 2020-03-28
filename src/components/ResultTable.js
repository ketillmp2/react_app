import React from "react";
import TableRow from "./TableRow";
import "../styles.css";


class ResultTable extends React.Component {

    render() {

        if (this.props.currentUser) {
            let className = "pointList container d-flex justify-content-center col-sm-4";
            if (!this.props.points) {
                return (
                    <div className={className}>
                        Загрузка точек...
                    </div>
                );
            }
            if (this.props.points.length === 0) {
                return (
                    <div className={className}>
                        Тут пока пусто :c
                    </div>
                );
            }
            return (
                <div className={className}>
                    <table className="resultTable table table-striped table-bordered table-sm" cellSpacing="0"
                           width="80%">
                        <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Хит</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.points.map(point => {
                                return (
                                    <TableRow point={point} key={point.id} r={this.props.r}/>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default ResultTable;
