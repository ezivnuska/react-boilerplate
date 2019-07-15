import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './SwitchMenu.scss'

class SwitchMenu extends PureComponent {

  state = {
    currentIndex: 0
  }

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    height: PropTypes.number.isRequired
  }

  static defaultProps = {
    height: 30
  }

  handleClick = (e, onClick, index) => {
    e.preventDefault()
    this.setState({ currentIndex: index })
    onClick(index)
  }

  render() {
    const { active, height, options } = this.props
    const { currentIndex } = this.state
    
    return (
      <div
        className={'switch-menu active-option-' + currentIndex}
        style={{ height }}
      >
        <div className='switch-menu-options' style={{ height }}>
          {options.map((option, i) => (
            <span
              key={i}
              className={'switch-menu-option'}
              style={{ height, lineHeight: (height - 3) + 'px' }}
              onClick={e => this.handleClick(e, option.onClick, i)}
            >
              {option.label}
            </span>
          ))}
        </div>
        <div
          className='control-indicator'
          style={{ height }}
        />
      </div>
    )
  }
}

export default SwitchMenu
