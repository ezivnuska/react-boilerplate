import React from 'react'

import { Module } from 'components'

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
        <Module title='Current Name'>
            {renderName()}
        </Module>
    )
}

export default NamePreview