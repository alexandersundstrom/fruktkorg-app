import dom from '../../main/transpiler';

import { Component } from '../Component';
import { Pagination } from '../Pagination/Pagination.jsx';
import './PaginationTable.scss';
import arrowDown from './arrow_down.png';
import arrowUp from './arrow_up.png';

export class PaginationTable extends Component {
  constructor(props) {
    super(props);
    const { rows, columns, itemsPerPage, sortAscending, currentPage } = this.props;
    const displayedRows = this.getDisplayedRows(
      rows,
      currentPage,
      itemsPerPage
    );

    this.setState({
      itemsPerPage,
      currentPage,
      displayedRows,
      rows,
      columns,
      sortAscending: sortAscending
    });
  }

  getDisplayedRows(rows, currentPage, itemsPerPage) {
    const startindex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(rows.length, currentPage * itemsPerPage);
    return rows.slice(startindex, endIndex);
  }

  onChange(currentPage, itemsPerPage) {
    const { rows } = this.state;
    const displayedRows = this.getDisplayedRows(
      rows,
      currentPage,
      itemsPerPage
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
                <tr>{this.getHeaderContent(column)}</tr>
              </th>
            );
          })}
          {this.getColumnsContent()}
        </table>
      </div>
    );
  }

  getHeaderContent(column) {
    const { sortAscending } = this.state;
    return column.comparator ? (
      <a
        onClick={() => {
          const { sortAscending, currentPage} = this.state;
          this.setState({ sortAscending: !sortAscending });
          column.comparator(!sortAscending, currentPage);
        }}
      >
        <img
          className="arrow-image"
          src={sortAscending ? arrowDown : arrowUp}
        />
        <span>{column.name}</span>
      </a>
    ) : (
      column.name
    );
  }

  getColumnsContent() {
    const {
      columns,
      displayedRows,
    } = this.state;
    return displayedRows
      ? displayedRows.map(row => {
        return (
          <tr className="table-row">
            {columns.map(column => {
              return <td>{row[column.key]}</td>;
            })}
          </tr>
        );
      })
      : null;
  }
}
