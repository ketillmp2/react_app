import React from "react";
import TableRow from "./TableRow";
import "../styles.css";

class ResultTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.points) {
            return (
                <div className="resultTable">
                    Загрузка точек...
                </div>
            );
        }
        if (this.props.points.length === 0) {
            return (
                <div className="resultTable">
                    Тут пока пусто :c
                </div>
            );
        }
        return (
          <div className="resultTable">
              <tbody>
              <tr>
                  <th>Номер</th>
                  <th>X</th>
                  <th>Y</th>
                  <th>R</th>
                  <th>Попала?</th>
              </tr>
              </tbody>

              {
                  this.props.map(point => {
                      return(
                        <TableRow point={point} />
                      );
                  })
              }
          </div>
        );
    }
}

export default ResultTable;
