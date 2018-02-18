import React from 'react';
import FormController from './FormController';
import PaypalButton from './PaypalButton';

const prodMode = window.location.href.indexOf('localhost') !== 7;

class ReservationForm extends FormController {
  getSubmissionUrl() {
    const url = prodMode
      ? 'http://fpb.internetcompany.io/reservation'
      : 'http://localhost:4331/reservation';
    return url;
  }

  getButtonText () {
    return 'Submit Reservation';
  }

  getSuccessContent () {
    return (
      <React.Fragment>
        <br />
        <br />
        <b>Please submit your deposit in the amount of $249.99 using the PayPal button below in order to reserve a photo booth for your event.</b>

        <br />
        <PaypalButton />
      </React.Fragment>
    );
  }

  getDescription () {
    return 'Enter your event info & place your $249.99 deposit to reserve your photo booth.';
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
        key: 'address',
        label: 'Event Address',
        defaultValue: '',
        placeholder: 'e.g. 123 Street Avenue, West Chester PA'
      },
      {
        key: 'hours',
        label: 'Number of Hours...',
        defaultValue: '2 hours',
        options: [
          '2 hours',
          '3 hours',
          '4 hours',
          '5 hours'
        ]
      },
      {
        key: 'phone',
        label: 'Phone Number',
        defaultValue: '',
        placeholder: 'e.g., 610.123.4567'
      },
      {
        key: 'date',
        label: 'Event Date',
        defaultValue: '',
        placeholder: '(dd-mm-yy)'
      },
      {
        key: 'email',
        label: 'Email Address',
        defaultValue: '',
        placeholder: 'e.g., yourname@gmail.com'
      },
      {
        key: 'graphics',
        label: 'Title and Date for Graphics',
        placeholder: 'E.g., "Sarah and Mark, June 18th 2014"'
      }
    ];
  }
};

export default ReservationForm;
