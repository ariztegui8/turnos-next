import React from 'react'

const EmailTemplate = ({ firstName }) => {

    return (
        <div>
            <h1>Welcome, {firstName}!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, similique odit veniam adipisci error exercitationem ut possimus eveniet qui maiores vel modi. Quae, molestiae minima illo nemo praesentium ducimus vero.</p>
            <button className='btn btn-primary'>GO</button>
        </div>
    );

}

export default EmailTemplate
