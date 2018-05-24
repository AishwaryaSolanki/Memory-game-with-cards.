import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'


const Card = (props) => {
      //conditionally adds a bg color
      let style = {};
            if (props.showing) {
            style.backgroundColor = props.backgroundColor;
        }
  
  return (
      //rendering all 16 cards
    <div
    //responding to click events
      onClick={props.onClick}
      className="card-container"
      style={style}
    />
  );
}

Card.propTypes = {
   showing: PropTypes.bool.isRequired,
   backgroundColor: PropTypes.string.isRequired,
   onClick: PropTypes.func.isRequired
}


export default Card;