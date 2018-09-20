import dom from '../../main/transpiler';

import { Component } from '../Component';
import { Pagination } from '../Pagination/Pagination.jsx';
import './PaginationTable.scss';

export class PaginationTable extends Component {
  constructor(props) {
    super(props);
    const { rows, columns, itemsPerPage } = this.props;
    const currentPage = 1;
    const displayedRows = rows.slice(
      (currentPage - 1) * itemsPerPage,
      Math.min(rows.length, currentPage * itemsPerPage)
    );
    this.setState({
      itemsPerPage,
      currentPage,
      displayedRows,
      rows,
      columns
    });
  }

  onChange(currentPage, itemsPerPage) {
    const { rows } = this.state;
    const displayedRows = rows.slice(
      (currentPage - 1) * itemsPerPage,
      Math.min(rows.length, currentPage * itemsPerPage)
    );
    this.setState({
      itemsPerPage,
      currentPage,
      displayedRows
    });
  }

  render() {
    const {
      columns,
      displayedRows,
      itemsPerPage,
      rows,
      currentPage
    } = this.state;

    if (!columns) {
      return null;
    }

    return (
      <div>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={this.onChange.bind(this)}
          onPageChange={this.onChange.bind(this)}
          items={rows.length}
        />
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
