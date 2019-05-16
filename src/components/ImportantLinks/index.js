import React from 'react'
import { MenuButton } from 'components'

const ImportantLinks = props => (
  <ul>
    <li>
      <MenuButton
        to='/cookie-policy'
        iconClass='fas fa-cookie-bite'
      >
        Cookie Policy
      </MenuButton>
    </li>
    <li>
      <MenuButton
        to='/privacy-policy'
        iconClass='fas fa-user-secret'
      >
        Privacy Policy
      </MenuButton>
    </li>
    <li>
      <MenuButton
        to='/terms'
        iconClass='fas fa-handshake'
      >
        T&amp;C's
      </MenuButton>
    </li>
  </ul>
)

export default ImportantLinks
