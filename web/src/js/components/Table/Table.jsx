import dom from '../../main/transpiler';

import {Component} from '../Component';
import {Pagination} from "../Pagination/Pagination.jsx";
import './Table.scss';

export class Table extends Component {

  constructor(props) {

    super(props);
    const {rows, columns, limit} = this.props;
    const currentPage = 1;
    const displayedRows = rows.slice((currentPage - 1) * limit, Math.min(rows.length, currentPage * limit));
    this.setState({
      limit: limit,
      currentPage: currentPage,
      displayedRows: displayedRows,
      rows: rows,
      columns: columns
    });
  }

  onChange(currentPage, limit) {
    // console.log(currentPage);
    const { rows } = this.state;
    const displayedRows = rows.slice((currentPage - 1) * limit, Math.min(rows.length, currentPage * limit));
    this.setState({
      limit: limit,
      currentPage: currentPage,
      displayedRows: displayedRows
    });
  }

  render() {
    const {columns, displayedRows, limit, rows, currentPage} = this.state;

    if (!columns) {
      return null;
    }

    return (
      <div>
        <Pagination  currentPage={currentPage} limit={limit} onLimitChange={this.onChange.bind(this)} onPageChange={this.onChange.bind(this)} items={rows.length}/>
        <table className="full-width-table">
          {columns.map(column => {
            return (
              <th>
                <tr>{column.name}</tr>
              </th>
            );
          })}
          {displayedRows
            ? displayedRows.map(row => {
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
