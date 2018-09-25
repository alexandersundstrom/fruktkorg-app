import dom from '../../main/transpiler';
import { Component } from '../Component';
import './Pagination.scss';
import '../../../sass/common.scss';

/**
 * A generic component that can be used where pagination is needed. Renders a pagination bar.
 *
 * @param {Object} props - Holds the information to render the component
 *  @param {Integer} props.items - The amount of items
 *  @param {Integer} props.itemsPerPage - The amount of items to display per page
 *  @param {Integer} props.currentPage - The number for the current page to be displayed
 *  @param {Function} props.onPageChange - Optional, An callback function called when changing the current page.
 *  Called with two parameters, pageNumber and itemsPerPage. Use this to update other components that displays items.
 *  @param {Function} props.onItemsPerPageChange - Called when the amount of items per page changes.
 *  Called with two parameters, pageNumber and itemsPerPage. Use this to update other components that displays items.
 */
export class Pagination extends Component {
  constructor(props) {
    super(props);

    const {
      items,
      onPageChange,
      onItemsPerPageChange,
      itemsPerPage,
      currentPage
    } = this.props;

    const pages = this.getNumberOfPages(items, itemsPerPage);

    this.setState({
      currentPage,
      itemsPerPage,
      sortAscending: true,
      pages,
      items,
      onPageChange,
      onItemsPerPageChange
    });
  }

  getNumberOfPages(items, itemsPerPage) {
    const minimumPages = 1;
    const minimumItems = 1;
    const divisionSafeItems = Math.max(items, minimumItems);

    const pages = Math.max(
      minimumPages,
      Math.ceil(divisionSafeItems / itemsPerPage)
    );
    return pages;
  }

  gotoPage(pageNumber) {
    const { currentPage, pages, onPageChange, itemsPerPage } = this.state;
    if (pageNumber === currentPage || pageNumber < 1 || pageNumber > pages) {
      return;
    }

    if (onPageChange && typeof onPageChange === 'function') {
      onPageChange(pageNumber, itemsPerPage);
    }

    this.setState({
      currentPage: pageNumber
    });
  }

  getCurrentItemsDescription() {
    const { currentPage, items, itemsPerPage } = this.state;
    return `Visar ${Math.min(
      (currentPage - 1) * itemsPerPage + 1,
      items
    )}-${Math.min(currentPage * itemsPerPage, items)} av ${items}`;
  }

  goToLastPage() {
    this.gotoPage(this.getLastPageNumber());
  }

  goToNextPage() {
    this.gotoPage(this.state.currentPage + 1);
  }

  goToPreviousPage() {
    this.gotoPage(this.state.currentPage - 1);
  }

  goToFirstPage() {
    this.gotoPage(1);
  }

  setItemsPerPage(event) {
    const newItemsPerPage = parseInt(event.target.value);
    const numberOfPages = this.getNumberOfPages(
      this.state.items,
      newItemsPerPage
    );
    const newCurrentPage =
      this.state.currentPage > numberOfPages
        ? numberOfPages
        : this.state.currentPage;

    this.setState({
      itemsPerPage: newItemsPerPage,
      pages: numberOfPages,
      currentPage: newCurrentPage
    });
    const { onItemsPerPageChange, itemsPerPage } = this.state;
    if (onItemsPerPageChange && typeof onItemsPerPageChange === 'function') {
      onItemsPerPageChange(newCurrentPage, itemsPerPage);
    }
  }

  getLastPageNumber() {
    return this.state.pages;
  }

  render() {
    const { itemsPerPage, currentPage, items } = this.state;
    const firstPage = 1;

    if (!items || items.length === 0) {
      return null;
    }

    return (
      <div id="pagination-container" className="pagination-container">
        <div className="flex-div">
          <div className="flex-div">
            <div className="page">
              <a
                id="firstPageButton"
                onClick={() => this.goToFirstPage()}
                className={currentPage === firstPage ? 'disabled' : ''}
              >
                &lt;&lt;
              </a>
            </div>
            <div className="page">
              <a
                id="previousPageButton"
                onClick={() => this.goToPreviousPage()}
                className={currentPage === firstPage ? 'disabled' : ''}
              >
                &lt;
              </a>
            </div>
          </div>
          <div className="limit-div">
            <strong className="brodtext" id="title">
              {'Antal per sida '}
            </strong>
            <div className="margin-left limit-container">
              <select
                onChange={event => this.setItemsPerPage(event)}
                id="limitSelector"
                className="dropdown-select"
              >
                <option value="10" selected={itemsPerPage === 10}>
                  10
                </option>
                <option value="25" selected={itemsPerPage === 25}>
                  25
                </option>
                <option value="50" selected={itemsPerPage === 50}>
                  50
                </option>
                <option value="100" selected={itemsPerPage === 100}>
                  100
                </option>
                {/*<option value="-1">Alla</option>*/}
              </select>
            </div>
          </div>
          <div className="flex-div">
            <div className="page">
              <a
                id="nextPageButton"
                className={
                  currentPage === this.getLastPageNumber() ? 'disabled' : ''
                }
                onClick={() => this.goToNextPage()}
              >
                &gt;
              </a>
            </div>
            <div className="page">
              <a
                id="lastPageButton"
                className={
                  currentPage === this.getLastPageNumber() ? 'disabled' : ''
                }
                onClick={() => this.goToLastPage()}
              >
                &gt;&gt;
              </a>
            </div>
          </div>
        </div>
        <div id="pageInfo" className="page-info brodtext">
          {this.getCurrentItemsDescription()}
        </div>
      </div>
    );
  }
}
