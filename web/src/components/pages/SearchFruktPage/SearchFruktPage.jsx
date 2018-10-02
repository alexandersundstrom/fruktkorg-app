import dom from '../../../framework/Transpiler';
import { Component } from '../../../framework/Component';
import { glassOn, glassOff } from '../../common/Glass/Glass.jsx';

import { PaginationTable } from '../../common/PaginationTable/PaginationTable.jsx';

const ENTER_KEY = 13;

export class SearchFruktPage extends Component {
  constructor(props) {
    super(props);
    this.setState({
      columns: null,
      rows: null,
      search: '',
      itemsPerPage: 10
    });
    this.inputElement = null;
  }

  handleSearch(event) {
    event.preventDefault();
    if (event.keyCode === ENTER_KEY && event.target.value) {
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
              {
                name: 'Namn',
                key: 'name',
                comparator: (a, b) => a.localeCompare(b)
              },
              {
                name: 'Antal frukter',
                key: 'fruktAmount',
                comparator: (a, b) => a - b
              },
              { name: 'Senast ändrad', key: 'lastChanged' }
            ],
            rows: rows.sort((a, b) => a.name.localeCompare(b.name)),
            search: event.target.value
          });
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

  componentDidMount() {
    this.inputElement.focus();
  }

  render() {
    const { columns, rows, search, itemsPerPage } = this.state;

    return (
      <div>
        <h2>Välkommen</h2>
        <h3>
          Här kan du få reda på vilka fruktkorgar den frukt du letar efter finns
          i.
        </h3>
        <span>Namn på frukt </span>
        <input
          id="search"
          value={search}
          type="text"
          ref={inputElement => (this.inputElement = inputElement)}
          onKeyUp={event => this.handleSearch(event)}
        />
        <PaginationTable
          columns={columns}
          rows={rows}
          itemsPerPage={itemsPerPage}
          noItemsText="Inga fruktkorgar hittade."
          sortByKey="name"
        />
      </div>
    );
  }
}
