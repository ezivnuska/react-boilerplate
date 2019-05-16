import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import MenuItem from './menu/MenuItem'

import './Menu.scss'

class Menu extends PureComponent {

  static propTypes = {
    itemHeight: PropTypes.number,
    options: PropTypes.array.isRequired,
    inline: PropTypes.bool
  }

  render() {
    const { inline, itemHeight, options } = this.props

    return (
      <ul className={'menu' + (inline ? ' inline' : '')}>
        {options.map(({label, ...rest}, i) => (
          <MenuItem key={i} {...rest}
            style={{ lineHeight: itemHeight ? itemHeight + 'px' : 'auto' }}
          >
            {label}
          </MenuItem>
        ))}
      </ul>
    )
  }
}

export default Menu
