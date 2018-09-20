import dom from '../../main/transpiler';
import {Component} from "../Component";
import './Pagination.scss';
import '../../../sass/common.scss'

export class Pagination extends Component {

  constructor(props) {
    super(props);

    const {items, onPageChange, onLimitChange, limit, currentPage} = this.props;
    const pages = this.getNumberOfPages(items, limit);

    this.setState({
      currentPage: currentPage,
      limit: limit,
      sortAscending: true,
      pages: pages,
      items: items,
      onPageChange: onPageChange,
      onLimitChange: onLimitChange
    });
  }

  getNumberOfPages(items, limit) {
    let minimumPages = 1;
    let minimumItems = 1;
    let divisionSafeItems = Math.max(items, minimumItems);

    const pages = Math.max(minimumPages, Math.ceil(divisionSafeItems / limit));
    return pages;
  }

  gotoPage(pageNumber) {
    const {currentPage, pages, onPageChange, limit} = this.state;
    if (pageNumber === currentPage || pageNumber < 1 || pageNumber > pages) {
      console.log(true);
      return;
    }

    this.setState({
      currentPage: pageNumber
    });
    this.refresh();
    if (onPageChange) {
      onPageChange(pageNumber, limit);
    }
  }

  getCurrentItemsDescription() {
    const {currentPage, items, limit} = this.state;
    return `Visar ${Math.min(((currentPage - 1) * limit) + 1, items)}-${Math.min(currentPage * limit, items)} av ${items}`
  }

  refresh() {

    this.updateArrowButtons();
    $('#pageInfo').html(this.getCurrentItemsDescription());
  }

  updateArrowButtons() {
    const {currentPage, pages} = this.state;
    const firstPage = 1;

    if (currentPage === firstPage) {
      $('#firstPageButton').addClass('disabled');
      $('#previousPageButton').addClass('disabled');
    } else {
      $('#firstPageButton').removeClass('disabled');
      $('#previousPageButton').removeClass('disabled');
    }

    if (currentPage === pages) {
      $('#lastPageButton').addClass('disabled');
      $('#nextPageButton').addClass('disabled');
    } else {
      $('#lastPageButton').removeClass('disabled');
      $('#nextPageButton').removeClass('disabled');
    }
  }

  goToLastPage() {
    this.gotoPage(this.getLastPageNumber());
  };

  goToNextPage() {
    this.gotoPage(this.state.currentPage + 1);
  };

  goToPreviousPage() {
    this.gotoPage(this.state.currentPage - 1);
  };

  goToFirstPage() {
    this.gotoPage(1);
  };

  setlimit(event) {
    let newLimit = parseInt(event.target.value);
    let numberOfPages = this.getNumberOfPages(this.state.items, newLimit);
    let newCurrentPage = this.state.currentPage > numberOfPages ? numberOfPages : this.state.currentPage;

    this.setState({
      limit: newLimit,
      pages: numberOfPages,
      currentPage: newCurrentPage
    });
    const {onLimitChange, limit} = this.state;
    if (onLimitChange) {
      onLimitChange(newCurrentPage, limit)
    }
    this.refresh();
  };

  getLastPageNumber() {
    return this.state.pages
  };

  render() {
    const {limit, currentPage, pages, items} = this.state;
    const firstPage = 1;

    return (
      <div className="pagination-container">
        <div className="flex-div">
          <div className="flex-div">
            <div className="page">
              <a id="firstPageButton" onClick={() => this.goToFirstPage()}
                 className={currentPage === firstPage ? 'disabled' : ''}>&lt;&lt;</a>
            </div>
            <div className="page">
              <a id="previousPageButton" onClick={() => this.goToPreviousPage()}
                 className={currentPage === firstPage ? 'disabled' : ''}>&lt;</a>
            </div>
          </div>
          <div className="limit-div">
            <strong className="brodtext" id="title">Antal per sida </strong>
            <div className="margin-left limit-container">
              <select onChange={event => this.setlimit(event)} id="limitSelector"
                      className="dropdown-select">
                <option value="10" selected={limit === 10}>10</option>
                <option value="25" selected={limit === 25}>25</option>
                <option value="50" selected={limit === 50}>50</option>
                <option value="100" selected={limit === 100}>100</option>
                {/*<option value="-1">Alla</option>*/}
              </select>
            </div>
          </div>
          <div className="flex-div">
            <div className="page">
              <a id="nextPageButton" className={currentPage === pages ? 'disabled' : ''}
                 onClick={() => this.goToNextPage()}>&gt;</a>
            </div>
            <div className="page">
              <a id="lastPageButton" className={currentPage === pages ? 'disabled' : ''}
                 onClick={() => this.goToLastPage()}>&gt;&gt;</a>
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
