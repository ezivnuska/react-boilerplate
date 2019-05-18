import React from 'react'

import './AbortButton.scss'

const AbortButton = ({ abort }) => (
    <button type='button' className='btn abort-button' onClick={e => abort(e)}>
        <i className='fas fa-window-close fa-5x'></i>
    </button>
)

export default AbortButton