import React from 'react'
import "../Styles/ConfirmBox.css"

function ConfirmBox(props) {
  return (
    <div className='confirmBox'>
        <div className='closeButton' onClick={props.cancel}>X</div>
        <div className='confirmMessage'>{props.message}</div>
        <div className='confirmButtonBar'>
            <button onClick={props.cancel}>Cancel</button>
            <button onClick={props.confirm}>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmBox