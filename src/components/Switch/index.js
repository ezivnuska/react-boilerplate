import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './Switch.scss'

class Switch extends PureComponent {

  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    height: PropTypes.number.isRequired,
    checked: PropTypes.bool
  }

  static defaultProps = {
    height: 30
  }

  handleClick = e => {
    e.preventDefault()
    this.props.onClick()
  }

  render() {
    const { checked, height, labels, name } = this.props
    
    return (
      <div
        className={'switch' + (checked ? ' checked' : '')}
        onClick={e => this.handleClick(e)}
        style={{ height }}
      >
        <div className='labels' style={{ height }}>
          {labels.map((label, i) => <span key={i} style={{ height, lineHeight: (height - 3) + 'px' }}>{label}</span>)}
        </div>
        <input
          className='switch-checkbox'
          type='checkbox'
          defaultChecked={checked}
          name={name}
        />
        <div
          className='control-indicator'
          style={{ height }}
        />
      </div>
    )
  }
}

export default Switch
