import React from 'react'

const EmailTemplate = ({ firstName }) => {

    return (
        <div>
            <h1>Welcome, {firstName}!</h1>
            <p>Eres BOBO</p>
            <button className='btn btn-primary'>Go web site</button>
        </div>
    );

}

export default EmailTemplate
