import React from 'react'
import { Icon } from 'components'

import './EditableContainer.scss'

const EditableContainer = ({ children, block, onClick, ...props }) => (
    <div
        className={'editable' + (block ? ' block' : '')}
        onClick={onClick}
    >
        <Icon
            iconClass='fas fa-edit'
            className='edit-button'
        />
        <div className='editable-content'>{children}</div>
    </div>
)

export default EditableContainer