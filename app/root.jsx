import React from 'react';
import QuoteForm from './QuoteForm';
import ReservationForm from './ReservationForm';
import Header from './Header';

const Root = () => {
  return (
    <div className="content-wrapper">
      <div className="content">
        <Header />
        <div className="FormRow">
          <QuoteForm />
          <ReservationForm />
        </div>
        <p id="Footer"><small>&copy; 2018 Forever Photo Booths</small></p>
      </div>
    </div>
  );
};

export default Root;
