import React from 'react'
import { Heading, Html, IconLink } from 'components'

import './Cloud.scss'
const size = 35;
const Cloud = ({ body, date, isMine, onEdit, onDelete, title }) => (
    <div className='cloud'>
        <div className='cloud-content'>
            <div className='cloud-heading'>
                <Heading level={3}>{title}</Heading>
            </div>
            <div className='cloud-date'>
                {date}
            </div>
            <div className={isMine ? ' mine' : ''}>
                <Html html={body}></Html>
            </div>
        </div>
        {isMine && (
            <div className='cloud-controls'>
                <div className='main-controls'>
                    <div>
                        <IconLink
                            iconClass='fas fa-pen'
                            height={size}
                            onClick={e => onEdit(e)}
                            style={{
                                fontSize: '20px',
                                width: size + 'px',
                                textAlign: 'center',
                                borderRadius: (size / 2) + 'px'
                            }}
                        />
                        <IconLink
                            iconClass='fas fa-trash-alt'
                            height={size}
                            onClick={e => onDelete(e)}
                            style={{
                                fontSize: '20px',
                                width: size + 'px',
                                textAlign: 'center',
                                borderRadius: (size / 2) + 'px'
                            }}
                        />
                    </div>
                </div>
            </div>
        )}
        <div className='cloud-fragment'></div>
        <div className='cloud-fragment'><div></div></div>
    </div>
)

export default Cloud