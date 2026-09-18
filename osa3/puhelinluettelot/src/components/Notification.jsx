import React from 'react'
import PropTypes from 'prop-types';
const Notification = ({ message,className }) => {
    console.log(className)
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}
Notification.propTypes = {
  message: PropTypes.any,
  className: PropTypes.any
  
}

export default Notification