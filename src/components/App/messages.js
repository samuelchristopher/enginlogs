import React from 'react'

const Messages = ({ message, showMessage }) => {
    let MessageElement = <div>{message}</div>
    return (
        <div className={ showMessage ? "message" : "message__hide"}>
            { showMessage ? MessageElement : '' }
        </div>
    )
}

export default Messages