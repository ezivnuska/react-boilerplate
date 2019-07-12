import React from 'react'
import { Heading, Html, Icon, Link } from 'components'

import './Cloud.scss'
const size = 35;
const Cloud = ({ body, title }) => (
    <div className='cloud'>
        <div className='cloud-content'>
            <div className='cloud-heading'>
                <Heading level={3}>{title}</Heading>
            </div>
            <div>
                <Html html={body}></Html>
            </div>
        </div>
        <div className='cloud-controls'>
            <div className='main-controls'>
                <div>
                    <Link
                        style={{
                            fontSize: '20px',
                            width: size + 'px',
                            textAlign: 'center',
                            borderRadius: (size / 2) + 'px'
                        }}
                        onClick={e => console.log('click')}
                        block
                    >
                        <Icon
                            iconClass='fas fa-trash-alt'
                            height={size}
                        />
                    </Link>
                </div>
            </div>
        </div>
        <div className='cloud-fragment'></div>
        <div className='cloud-fragment'><div></div></div>
    </div>
)

export default Cloud