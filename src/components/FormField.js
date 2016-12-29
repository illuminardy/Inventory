import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { decrementCount, incrementCount } from '../redux/actions/newItem';

require('../scss/form-field.scss');

@connect(() => { return {}}, { decrementCount, incrementCount })

export default class FormField extends Component {
  static propTypes = {
    name: PropTypes.string,
    isIntegerField: PropTypes.bool,
    selectOptions: PropTypes.array,
    errorMessage: PropTypes.string,
    incrementCount: PropTypes.func,
    decrementCount: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      errorActive: false,
      validInput: false
    }
  }

  validateInput = (event) => {
    const input  = event.target;
    const { errorActive, validInput } = this.state;
    const { decrementCount, incrementCount, isIntegerField } = this.props;

    let regEx = /^[a-zA-Z]{1,30}$/;

    if (isIntegerField) {
      regEx = /^\$?[\d,]+(\.\d*)?$/;
    }

    // Test for invalid input
    if (!regEx.test(input.value)) {
      this.setState({
        errorActive: true,
        validInput: false
      });
      // If empty field show warning but dont decrement or if error not currently active
      if (input.value && !errorActive) {
        decrementCount();
      }
    } else {
      // If previously false, increment valid field count
      if (!validInput) {
        incrementCount();
        this.setState({
          validInput: true
        });
      }
      // Turn off previously showing error message
      if (errorActive) {
        this.setState({
          errorActive: false
        });
      }
    }
  };

  render() {
    const { errorMessage, name, selectOptions } = this.props;
    const { errorActive } = this.state;

    const select = selectOptions ? selectOptions.map((item, index) => {
      return <option key={`select-${index}`} value={item.value}>{item.text}</option>
    }) : [];

    return (
      <div className="form-field">
        <div className="form-field__name">{name}</div>
        {select.length === 0 && !errorMessage &&
          <input
            type="text"
            ref={this.props.fieldRef}
            className="form-field__input"
          />
        ||
        select.length === 0 && errorMessage &&
          <input
            type="text"
            ref={this.props.fieldRef}
            className="form-field__input"
            onBlur={this.validateInput}
          />
        }
        {select.length > 0 &&
          <select ref={this.props.fieldRef} className="form-field__select">
            {select}
          </select>
        }
        {errorActive &&
          <div className="form-field__error">Required Field: {errorMessage}</div>
        }
      </div>
    );
  }
}
