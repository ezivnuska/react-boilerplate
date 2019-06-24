import React, { forwardRef } from 'react'

const Toolbar = forwardRef((props, ref) => (
    <div className='toolbar'
        {...props}
        ref={ref}
    />
))

export default Toolbar