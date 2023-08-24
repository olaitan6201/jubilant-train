import React from 'react'

export default function Errors({ errors }) {
    return (
        <div>
            {errors && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>}
        </div>
    )
}
