import dom, { Fragment } from '../../main/transpiler';
import { Component } from '../../components/Component';
import './CreateFruktkorgPage.scss';

export class CreateFruktkorgPage extends Component {
  constructor(props) {
    super(props);

    this.setState({
      fruktkorgName: '',
      frukter: []
    });
  }

  componentCanUnmount() {
    const { frukter, fruktkorgName } = this.createState();

    if (fruktkorgName || frukter.length > 0) {
      return 'Det finns osparade ändringar, är du säker på att du vill lämna sidan?';
    }

    return null;
  }

  createState() {
    const state = {
      fruktkorgName: $('#fruktkorgName').val(),
      frukter: []
    };

    for (let i = 0; i < this.state.frukter.length; ++i) {
      state.frukter.push({
        name: $(`#fruktName${i}`).val(),
        amount: $(`#fruktAmount${i}`).val()
      });
    }

    return state;
  }

  addFrukt() {
    const newState = this.createState();

    newState.frukter.push({
      name: '',
      amount: ''
    });

    this.setState({
      ...newState
    });
  }

  removeFrukt(index) {
    const newState = this.createState();

    newState.frukter.splice(index, 1);

    this.setState({
      ...newState
    });
  }

  render() {
    const { fruktkorgName, frukter } = this.state;

    return (
      <div>
        <h3>Skapa fruktkorg sida</h3>
        <div>
          <label htmlFor="fruktkorgName">{'Namn: '}</label>
          <input id="fruktkorgName" type="text" value={fruktkorgName} />
        </div>
        <div>
          <button
            onClick={() => this.addFrukt()}
            className="add-frukt-button"
          />
        </div>
        {frukter.map((frukt, i) => {
          return (
            <div>
              <label htmlFor={`fruktName${i}`}>Frukt Namn</label>
              <input id={`fruktName${i}`} type="text" value={frukt.name} />
              <label htmlFor={`fruktAmount${i}`}>Frukt Antal</label>
              <input
                id={`fruktAmount${i}`}
                type="number"
                value={frukt.amount}
              />
              <button
                onClick={() => this.removeFrukt(i)}
                className="remove-frukt-button"
              />
            </div>
          );
        })}
        <button>Skapa</button>
      </div>
    );
  }
}
