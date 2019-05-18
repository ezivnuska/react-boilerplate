import React from 'react'
import PropTypes from 'prop-types'

import './SplitForm.scss'

const SplitForm = ({ children, editing }) =>
    <div className={'split-form' + (editing ? ' editing' : '')}>{children}</div>

SplitForm.propTypes = {
    children: PropTypes.array.isRequired,
    editing: PropTypes.bool
}

export default SplitForm