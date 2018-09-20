import dom from '../../main/transpiler';

import { Component } from '../Component';
import { Pagination } from '../Pagination/Pagination.jsx';
import './PaginationTable.scss';
import arrowDown from './arrow_down.png';
import arrowUp from './arrow_up.png';

const getDisplayedRows = (rows, currentPage, itemsPerPage) => {
  const startindex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(rows.length, currentPage * itemsPerPage);
  return rows.slice(startindex, endIndex);
};

export class PaginationTable extends Component {
  constructor(props) {
    super(props);
    const { rows, columns, itemsPerPage } = this.props;
    const currentPage = 1;

    this.setState({
      itemsPerPage,
      currentPage,
      rows,
      columns,
      sortedBy: {
        key: null,
        ascending: false
      }
    });
  }

  onChange(currentPage, itemsPerPage) {
    this.setState({
      itemsPerPage,
      currentPage
    });
  }

  sortRows(key, comparator) {
    const { rows, sortedBy } = this.state;

    const ascending = sortedBy.key === key ? !sortedBy.ascending : true;

    const sortedRows = ascending
      ? rows.sort((a, b) => comparator(a[key], b[key]))
      : rows.reverse((a, b) => comparator(a[key], b[key]));

    this.setState({
      rows: sortedRows,
      sortedBy: {
        key,
        ascending
      }
    });
  }

  render() {
    const { columns, itemsPerPage, rows, currentPage, sortedBy } = this.state;

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
                <tr>
                  {column.comparator ? (
                    <a
                      onClick={event => {
                        event.preventDefault();
                        this.sortRows(column.key, column.comparator);
                      }}
                    >
                      <img
                        className="arrow-image"
                        src={
                          sortedBy.key === column.key && sortedBy.ascending
                            ? arrowUp
                            : arrowDown
                        }
                      />
                      <span>{column.name}</span>
                    </a>
                  ) : (
                    column.name
                  )}
                </tr>
              </th>
            );
          })}
          {this.renderRows()}
        </table>
      </div>
    );
  }

  getHeaderContent(column) {
    const { sortAscending } = this.state;
    return column.comparator ? (
      <a
        onClick={() => {
          const { sortAscending, currentPage } = this.state;
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

  renderRows() {
    const { columns, rows, currentPage, itemsPerPage } = this.state;
    const displayedRows = getDisplayedRows(rows, currentPage, itemsPerPage);
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
