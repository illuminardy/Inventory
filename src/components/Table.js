import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table'

require('../scss/table.scss');

export default class Table extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    const columns = [
      { header: 'Name', accessor: 'name'},
      { header: 'Description', accessor: 'description'},
      { header: 'Price', id: 'price', accessor: prop => (prop.price / 100).toFixed(2)},
      { header: 'Available Date', accessor: 'dateAvailable'},
      { header: 'Taxable', id: 'taxable', accessor: prop => prop.taxable.toString()}
    ];

    return (
      <ReactTable
        data={this.props.data}
        columns={columns}
        minRows={1}
        tableClassName={"react-table"}
        theadClassName={"react-table--thead"}
        tbodyClassName={"react-table--tbody"}
      />
    );
  }
}
