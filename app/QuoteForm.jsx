import React from 'react';
import FormController from './FormController';

const prodMode = window.location.href.indexOf('localhost') !== 7;

class QuoteForm extends FormController {
  getSubmissionUrl() {
    const url = prodMode
      ? 'http://fpb.internetcompany.io/quote'
      : 'http://localhost:4331/quote';
    return url;
  }

  getButtonText () {
    return 'Check Availability';
  }

  getDescription () {
    return (<span>See if your event date is still available. <br />And get an instant price quote!</span>);
  }

  getFields () {
    return [
      {
        key: 'name',
        label: 'Your Name',
        defaultValue: '',
        placeholder: 'e.g., John Smith'
      },
      {
        key: 'phone',
        label: 'Phone Number',
        defaultValue: '',
        placeholder: 'e.g., 610.123.4567'
      },
      {
        key: 'date',
        label: 'Date',
        defaultValue: '',
        placeholder: 'e.g., March 23'
      },
      {
        key: 'email',
        label: 'Email Address',
        defaultValue: '',
        placeholder: 'e.g., yourname@gmail.com'
      }
    ];
  }
};

export default QuoteForm;
