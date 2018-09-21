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
    const { itemsPerPage, sortByKey } = this.props;
    const currentPage = 1;

    this.setState({
      itemsPerPage,
      currentPage,
      sortedBy: {
        key: sortByKey,
        ascending: !!sortByKey
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
    const { sortedBy } = this.state;
    const { rows } = this.props;

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

  componentCanUnmount() {
    return 'NEIN';
  }

  render() {
    const { itemsPerPage, currentPage } = this.state;
    const { noItemsText, columns, rows } = this.props;

    if (!rows || !columns) {
      return null;
    }

    if (rows.length === 0) {
      return <div className="no-items">{noItemsText}</div>;
    } else {
      return (
        <div>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(currentPage, itemsPerPage) =>
              this.onChange(currentPage, itemsPerPage)
            }
            onPageChange={(currentPage, itemsPerPage) =>
              this.onChange(currentPage, itemsPerPage)
            }
            items={rows.length}
          />
          <table className="full-width-table">
            {this.renderHeaders(columns)}
            {this.renderRows()}
          </table>
        </div>
      );
    }
  }

  renderHeaders(columns) {
    const { sortedBy } = this.state;

    return columns.map(column => {
      return (
        <th className={sortedBy.key === column.key ? 'selected' : 'unselected'}>
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
    });
  }

  renderRows() {
    const { currentPage, itemsPerPage } = this.state;
    const { columns, rows } = this.props;

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
