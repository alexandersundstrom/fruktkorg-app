import dom, { Fragment } from '../../main/transpiler';
import { Table } from '../../components/Table/Table.jsx';
import { generateGuid } from '../../util/Util';

const ENTER_KEY = 13;

const handleResult = (tableContainerId, result) => {
  const tableContainer = $(`#${tableContainerId}`);

  const rows = result.map(fruktkorg => ({
    name: fruktkorg.name,
    fruktAmount: fruktkorg.fruktList.length,
    lastChanged: fruktkorg.lastChanged
  }));

  tableContainer.html(
    <Table
      columns={[
        { name: 'Namn', key: 'name' },
        { name: 'Antal frukter', key: 'fruktAmount' },
        { name: 'Senast ändrad', key: 'lastChanged' }
      ]}
      rows={rows}
    />
  );
};

const handleSearch = tableContainerId => {
  return event => {
    event.preventDefault();
    if (event.keyCode === ENTER_KEY) {
      $.ajax({
        url: `http://localhost:8090/fruktkorg/frukt/${event.target.value}`,
        success: result => {
          handleResult(tableContainerId, result);
        },
        error: error => {
          console.error(error);
        }
      });
    }
  };
};

export class SearchFruktPage {
  constructor() {
    this.tableContainerId = null;
    this.columns = [
      { name: 'Namn', key: 'name' },
      { name: 'Antal frukter', key: 'fruktAmount' },
      { name: 'Senast ändrad', key: 'lastChanged' }
    ];
    this.rows = [];
  }

  render() {
    this.tableContainerId = generateGuid();

    return (
      <Fragment>
        <input type="text" onKeyUp={handleSearch(this.tableContainerId)} />
        <Table columns={this.columns} rows={this.rows} />
      </Fragment>
    );
  }
}
