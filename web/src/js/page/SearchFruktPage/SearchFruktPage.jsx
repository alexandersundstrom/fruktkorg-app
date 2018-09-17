import dom, { Fragment } from '../../main/transpiler';
import { Table } from '../../components/Table/Table.jsx';
import { Component } from '../../components/Component'

const ENTER_KEY = 13;

export class SearchFruktPage extends Component {
  constructor() {
    super();
    this.setState({
      columns: [],
      rows: []
    });
  }

  handleSearch(event) {
    event.preventDefault();
    if (event.keyCode === ENTER_KEY) {
      $.ajax({
        url: `http://localhost:8090/fruktkorg/frukt/${event.target.value}`,
        success: result => {
          const rows = result.map(fruktkorg => ({
            name: fruktkorg.name,
            fruktAmount: fruktkorg.fruktList.length,
            lastChanged: fruktkorg.lastChanged
          }));
          console.log(rows);
          this.setState({
            columns: [
              { name: 'Namn', key: 'name' },
              { name: 'Antal frukter', key: 'fruktAmount' },
              { name: 'Senast ändrad', key: 'lastChanged' }
            ],
            rows
          });
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

  render() {
    const { columns, rows } = this.state;
    console.log('render', this.state);
    return (
      <Fragment>
        <input type="text" onKeyUp={(event) => this.handleSearch(event)} />
        <Table columns={columns} rows={rows} />
      </Fragment>
    );
  }
}
