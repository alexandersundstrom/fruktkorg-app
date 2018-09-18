import dom from '../../main/transpiler';
import { Component } from '../../components/Component';
import { glassOn, glassOff } from '../../components/Glass/Glass.jsx';

import { Table } from '../../components/Table/Table.jsx';

const ENTER_KEY = 13;

export class SearchFruktPage extends Component {
  constructor() {
    super();
    this.setState({
      columns: [],
      rows: [],
      search: ''
    });
  }

  handleSearch(event) {
    event.preventDefault();
    if (event.keyCode === ENTER_KEY) {
      glassOn('Laddar...');
      $.ajax({
        url: `http://localhost:8090/fruktkorg/frukt/${event.target.value}`,
        success: result => {
          glassOff();
          const rows = result.map(fruktkorg => ({
            name: fruktkorg.name,
            fruktAmount: fruktkorg.fruktList.reduce((amount, frukt) => {
              return amount + frukt.amount;
            }, 0),
            lastChanged: fruktkorg.lastChanged
          }));
          this.setState({
            columns: [
              { name: 'Namn', key: 'name' },
              { name: 'Antal frukter', key: 'fruktAmount' },
              { name: 'Senast ändrad', key: 'lastChanged' }
            ],
            rows,
            search: event.target.value
          });
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

  render() {
    const { columns, rows, search } = this.state;

    return (
      <div>
        <h2>Välkommen</h2>
        <h3>Här kan du få reda på vilka fruktkorgar den frukt du letar efter finns i.</h3>
        <span>Namn på frukt </span>
        <input
          value={search}
          type="text"
          onKeyUp={event => this.handleSearch(event)}
        />
        <Table columns={columns} rows={rows} />
      </div>
    );
  }
}
