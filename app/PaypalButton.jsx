import React from 'react';

const PaypalButton = () => (
  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" style={{ margin: '10px auto' }}>
    <input type="hidden" name="cmd" value="_s-xclick"/>
    <input type="hidden" name="hosted_button_id" value="S9MDVV2KYKWNY"/>
    <input
      type="image"
      src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
      border="0"
      name="submit"
      alt="PayPal - The safer, easier way to pay online!"
    />
    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
  </form>
);

export default PaypalButton;
