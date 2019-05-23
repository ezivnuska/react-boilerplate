import React from 'react'

const NamePreview = ({ session }) => {
    const { getCurrentUser } = session
    const { firstname, lastname } = getCurrentUser
    return (
        <div className='name-preview padded'>
            {firstname} {lastname}
        </div>
    )
}

export default NamePreview