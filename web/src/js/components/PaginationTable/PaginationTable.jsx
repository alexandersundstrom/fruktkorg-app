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

/**
 * Creates a table with a pagination component.
 *
 * @param {Object} props - Holds the information to render the component
 *
 *  @param {Object[]} props.columns - A list of column objects.
 *    @param {String} props.columns[].name - Displayed in table header.
 *    @param {String} props.columns[].key - Links row content to the right column. should be the same on both column and row.
 *    @param {Function} props.columns[].comparator - Optional, a comparator for sorting the column. If not provided, the column is not sortable
 *
 *
 *  @param {Object[]} props.rows The items to render. The properties on the fields is expected to be the same keys defined in columns.
 *
 *  @param {Integer} props.itemsPerPage Initials how many items that are displayed on the page.
 *
 *  @param {String} props.noItemsText Optional, Adds a message if there are no objects to render.
 *
 *  @param {String} props.sortByKey Optional, The key for the column that should be used as the default sorting. Requires a comparator to have been set.
 *
 */
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
          <td>
            {column.comparator ? (
              <a
                id={`sort-by-${column.key}`}
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
          </td>
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
