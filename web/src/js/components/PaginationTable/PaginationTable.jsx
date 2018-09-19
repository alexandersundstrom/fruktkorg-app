import dom from '../../main/transpiler';
import {Component} from "../Component";
import './PaginationTable.scss';

export class PaginationTable extends Component {

  constructor() {
    super();
    this.setState({
      currentPage: 1,
      itemsPerPage: 10,
      sortAscending: true,
      title: '',
      pages: 1
    });
  }

  gotoPage(pageNumber) {
    const {currentPage} = this.state;
    if (pageNumber === currentPage || pageNumber < 1 || pageNumber > this.getLastPageNumber()) {
      return;
    }

    this.setState({
      currentPage: pageNumber
    });

    // refreshTable(); //Perhaps not needed
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

  setItemsPerPage(event) {
    event.preventDefault();
    this.setState({
      itemsPerPage: event.target.value
    })
  };

  getLastPageNumber() {
    return this.state.pages
  };

  render() {
    const {title, pages} = this.props;
    console.log(pages)
    this.setState({
      title: title,
      pages: pages
    });

    return (
      <div className="pagination-container">
        <div className="flex-div">
          <div className="flex-div">
            <div className="page">
              <a id="firstPageButton" onClick={() => this.goToFirstPage()} className="disabled">&lt;&lt;</a>
            </div>
            <div className="page">
              <a id="previousPageButton" onClick={() => this.goToPreviousPage()} className="disabled">&lt;</a>
            </div>
          </div>
          <div className="limit-div">
            <strong id="title"/>
            <div className="{app.dr_val} limit-container">
              <select onChange={event => this.setItemsPerPage(event)} id="itemsPerPageSelector"
                      className="dropdown-select">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="-1">Alla</option>
              </select>
            </div>
          </div>
          <div className="flex-div">
            <div className="page">
              <a id="nextPageButton" onClick={() => this.goToNextPage()}>&gt;</a>
            </div>
            <div className="page">
              <a id="lastPageButton" onClick={this.goToLastPage()}>&gt;&gt;</a>
            </div>
          </div>
        </div>
        <div id="pageInfo" className="page-info"/>
      </div>
    );
  }
}
