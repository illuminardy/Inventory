import React, { Component, PropTypes } from 'react';
import APIClient from '../../api/APIClient';
import Calendar from 'react-input-calendar'
import FormField from '../components/FormField';
import moment from 'moment';
import { connect } from 'react-redux';
import { resetFieldsCompleted } from '../redux/actions/newItem';
import { setNewItemModalActive } from '../redux/actions/inventory';

require('../scss/new-item.scss');
require('../scss/calendar.scss');

@connect(state => ({
  fieldsCompleted: state.newItem.fieldsCompleted
}), { resetFieldsCompleted, setNewItemModalActive })

export default class NewItem extends Component {
  static propTypes = {
    resetFieldsCompleted: PropTypes.func,
    setNewItemModalActive: PropTypes.func,
    fieldsCompleted: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.client = new APIClient();

    // Initialize state with current date for Calendar component
    this.state = {
      time: moment().format('MM-DD-YYYY')
    };
  }

  postNewItem = () => {
    if (!this.props.formErrorsActive) {
      // Get all fields
      const itemName = this.name.value || ' ';
      const itemDescription = this.description.value || ' ';
      const itemPrice = this.price.value || 0.0;
      const itemDate = this.state.time;
      const itemTaxable = this.taxable.value  === "true";

      // Submit POST request
      this.client.postStockItem({
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        dateAvailable: itemDate,
        taxable: itemTaxable
      });

      this.props.resetFieldsCompleted();
      this.closeModal();
    }
  };

  calendarSelection = (date) => {
    this.setState({
      time: date
    });
  };

  closeModal = () => {
    this.props.setNewItemModalActive(false);
  };

  render() {
    const { fieldsCompleted } = this.props;

    const taxableOptions = [
      { value: "true", text: "Yes" },
      { value: "false", text: "No" }
    ];

    // If more than 1 form validation error, disable submit
    const allFieldsCompleted = fieldsCompleted === 3;
    const submitClass = `${!allFieldsCompleted ? 'new-item__cta--disabled' : 'new-item__cta'}`;

    return (
      <div className="new-item__overlay">
        <div className="new-item__container">
          <h1 className="new-item__title">Add New Item</h1>
          <FormField errorMessage="No numbers allowed" fieldRef={name => this.name = name} name="Name" />
          <FormField errorMessage="No numbers allowed" fieldRef={description => this.description = description} name="Description" />
          <FormField errorMessage="No text allowed" fieldRef={price => this.price = price} name="Price" isIntegerField />
          <div className="new-item__date">Date Available</div>
          <Calendar format='MM/DD/YYYY' date={this.state.time} closeOnSelect onChange={this.calendarSelection}/>
          <FormField
            fieldRef={taxable => this.taxable = taxable}
            name={"Taxable"}
            selectOptions={taxableOptions}
          />
          {!allFieldsCompleted &&
            <div className={submitClass}>
              Submit
            </div>
          }
          {allFieldsCompleted &&
            <div onClick={this.postNewItem} className={submitClass}>
              Submit
            </div>
          }
          <div onClick={this.closeModal} className="close-thick" />
        </div>
      </div>
    );
  }
}
