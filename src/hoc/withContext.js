import React, { Component, createContext } from 'react'

const Context = createContext()

class Provider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            closeModal: () => 
                this.setState({ modal: null }),
            openModal: name =>
                this.setState({ modal: name })
        }
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const withContext = Component => props => (
    <Provider>
        <Component {...props} />
    </Provider>
)

export const withState = Component => props => (
    <Context.Consumer>
        {context => <Component context={context} {...props} />}
    </Context.Consumer>
)