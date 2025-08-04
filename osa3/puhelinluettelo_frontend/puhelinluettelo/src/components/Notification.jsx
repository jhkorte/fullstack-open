const Notification = ({ message, type }) => {
    if (message === null) {
        console.log('tried to create notification; message is null')
        return null
    } 
    
    if (type !== 'good' && type !== 'error') {
        console.log('tried to create notification; invalid type')
        return null
    }

    if (type === 'good') {
        return (
            <div className="notificationGood">
                {message}
            </div>
        )
    }

    if (type === 'error') {
        return (
            <div className="notificationError">
                {message}
            </div>
        )
    }
    
    console.log('some other error when trying to create notification')
    return
}

export default Notification