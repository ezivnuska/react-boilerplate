import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Html, Link } from 'components'

import './MemoryBody.scss'

class MemoryBody extends Component {
  constructor(props) {
    super(props)
    const abbreviatedLength = 100
    this.state = {
      abbreviated: props.body.length > abbreviatedLength ? true : false,
      verbose: props.body.length > abbreviatedLength,
    }
  }

  static propTypes = {
    body: PropTypes.string.isRequired,
  }

  renderToggleLink() {
    const { verbose, abbreviated } = this.state
    return verbose && (
      <Link onClick={() => this.toggle()}>
        {abbreviated ? 'Read more' : 'Read less'}
      </Link>
    )
  }

  // formatBody = body => {
  //   let paras = body.split('\n')
  //   const { verbose, abbreviated } = this.state
  //   if (verbose && abbreviated) {
  //     const abbreviatedBody = body.substr(0, 100)
  //     const words = abbreviatedBody.split(' ')
  //     words.pop()
  //     const trimmed = words.join(' ')
  //     paras = trimmed.split('\n')
  //   }

  //   return paras.map((p, i) => <p key={i}>{p}{verbose && abbreviated ? '...' : ''} {this.renderToggleLink()}</p>)
  // }

  toggle() {
    this.setState({
      abbreviated: !this.state.abbreviated,
    })
  }

  render() {
    const { body } = this.props
    return (
      <div className='memory-body'>
        <Html html={body} />
      </div>
    )
  }
}

export default MemoryBody
