import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import APIClient from '../../api/APIClient';
import NewItem from '../containers/NewItem';
import Table from '../components/Table';
import { connect } from 'react-redux';
import { setNewItemModalActive } from '../redux/actions/inventory';

require('../scss/inventory.scss');

@connect(state => ({
  isVisible: state.inventory.isVisible
}), { setNewItemModalActive })

export default class Inventory extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    setNewItemModalActive: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      inventory: []
    }
    this.client = new APIClient();
    this.client.getInventoryList().then((inventory) => {
      this.mapInventory(inventory);
    });
  }

  newItem = () => {
    this.props.setNewItemModalActive(true);
  };

  refreshTable = () => {
    this.client.getInventoryList().then((inventory) => {
      this.mapInventory(inventory);
    });
  };

  mapInventory = (inventory) => {
    this.setState({
      inventory
    })
  };

  render() {
    const { newItemActive, inventory } = this.state;
    return (
      <div className="inventory__container">
        <div className="inventory__header">
          <h1 className="inventory__header--title">Inventory</h1>
          <div className="inventory__btn-group">
            <div onClick={this.newItem} className="inventory__btn-cta">
              New Item
            </div>
            <div onClick={this.refreshTable} className="inventory__btn-cta">
              Refresh
            </div>
          </div>
        </div>
        { inventory.length > 0 && <Table data={inventory}/> }
        { inventory.length === 0 && <h1>No Inventory Available!</h1> }
        { this.props.isVisible && <NewItem /> }
      </div>
    );
  }
}
