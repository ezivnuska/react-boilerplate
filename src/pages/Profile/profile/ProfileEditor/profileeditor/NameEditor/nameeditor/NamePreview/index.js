import React from 'react'

const NamePreview = ({ firstname, lastname }) => {
    const renderName = () => {
        if (!firstname && !lastname) {
            return 'Add your name to help your friends find you.'
        } else if (!lastname) {
            return firstname
        } else if (!firstname) {
            return lastname
        } else return `${firstname} ${lastname}`

    }
    return (
        <div className='name-preview'>
            {renderName()}
        </div>
    )
}

export default NamePreview