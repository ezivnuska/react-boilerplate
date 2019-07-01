import React from 'react'

import './Footer.scss'

const Footer = () => (
  <footer>
    <div className='container'>
      <div className='footer-container'>
        <div className='footer-left'>
          &copy; 2019
        </div>
        <div className='footer-center'>
          <ul>
            <li>
              <a
                href='https://github.com/ezivnuska/react-boilerplate'
                target='_blank'
              >
                <i className='fab fa-github'></i>
              </a>
            </li>
          </ul>
        </div>
        <div className='footer-right'>
          <a href='mailto:ezivnuska@gmail.com'>Contact</a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
