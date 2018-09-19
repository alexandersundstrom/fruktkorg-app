import dom from '../../main/transpiler';
import {Component} from "../Component";
import './PaginationTable.scss';
import '../../../sass/common.scss'

export class PaginationTable extends Component {

  constructor(props) {
    super(props);

    const {pages} = this.props;

    this.setState({
      currentPage: 1,
      itemsPerPage: 10,
      sortAscending: true,
      pages: pages
    });
  }

  gotoPage(pageNumber) {
    const {currentPage, pages} = this.state;
    if (pageNumber === currentPage || pageNumber < 1 || pageNumber > pages) {
      return;
    }

    this.setState({
      currentPage: pageNumber
    });
    this.refresh();
  }

  refresh() {
    this.updateArrowButtons();
    $('#pageInfo').html('');
    //   pageInfo.setInnerText((((pageable.getCurrentPage() - 1) * pageable.getItemsPerPage()) + 1) + "-" + (Math.min(pageable.getCurrentPage() * pageable.getItemsPerPage(), pageable.getItemCount()) + " av " + pageable.getItemCount()));
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

  setItemsPerPage(event) {
    event.preventDefault();
    this.setState({
      itemsPerPage: event.target.value
    })
  };

  getLastPageNumber() {
    return this.state.pages
  };

  // private void setRows(List<ClientReport> clientReports) {
  //   ListDataProvider<ClientReport> dataProvider = new ListDataProvider<>();
  //   dataProvider.addDataDisplay(reportTable);
  //
  //   List<ClientReport> list = dataProvider.getList();
  //   list.addAll(clientReports);
  //
  //   reportTable.addStyleName(style.fruktTable());
  //   reportTable.setVisibleRange(0, reportsPerPage);
  // }
  //
  // private void refreshTable() {
  //   if(clientReports == null) {
  //     return;
  //   }
  //   setRows(clientReports.subList((currentPage - 1) * reportsPerPage, Math.min(clientReports.size(), currentPage * reportsPerPage)));
  // }
  //
  // public void init(Pageable pageable) {


  render() {
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
            <strong className="brodtext" id="title">Antal per sida </strong>
            <div className="margin-left limit-container">
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
              <a id="lastPageButton" onClick={() => this.goToLastPage()}>&gt;&gt;</a>
            </div>
          </div>
        </div>
        <div id="pageInfo" className="page-info brodtext"/>
      </div>
    );
  }
}
