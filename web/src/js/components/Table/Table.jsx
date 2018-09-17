import dom from '../../main/transpiler';
import './Table.scss';

export class Table {
  render() {
    const { columns, rows } = this.params;

    return (
      <table>
        {columns.map(column => {
          return (
            <th>
              <tr>{column.name}</tr>
            </th>
          );
        })}
        {rows.map(row => {
          return (
            <tr className="table-row">
              {columns.map(column => {
                return <td>{row[column.key]}</td>;
              })}
            </tr>
          );
        })}
      </table>
    );
  }
}
