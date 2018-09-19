import dom from '../../main/transpiler';

import { Component } from '../Component';
import { PaginationTable } from "../PaginationTable/PaginationTable.jsx";
import './Table.scss';

export class Table extends Component {
  render() {
    const { columns, rows } = this.props;

    if (!columns) {
      return null;
    }

    return (
      <div>
        <PaginationTable pages={10}/>
        <table className="full-width-table">
          {columns.map(column => {
            return (
              <th>
                <tr>{column.name}</tr>
              </th>
            );
          })}
          {rows
            ? rows.map(row => {
                return (
                  <tr className="table-row">
                    {columns.map(column => {
                      return <td>{row[column.key]}</td>;
                    })}
                  </tr>
                );
              })
            : null}
        </table>
      </div>
    );
  }
}
