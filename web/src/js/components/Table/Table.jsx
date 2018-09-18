import dom from '../../main/transpiler';

import { Component } from '../Component';

import './Table.scss';

export class Table extends Component {
  render() {
    const { columns, rows } = this.props;

    if (!columns) {
      return null;
    }

    return (
      <div>
        <table>
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
