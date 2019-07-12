import React, { Component, createContext } from 'react'

const Context = createContext()

class Provider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            memory: null,
            closeModal: () => 
                this.setState({ modal: null }),
            openModal: name =>
                this.setState({ modal: name }),
            openMemoryModal: memoryId =>
                this.setState({
                    memory: memoryId,
                    modal: 'memory'
                }),
            closeMemoryModal: () =>
                this.setState({
                    memory: null,
                    modal: null
                })
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
const withContext = Component => props => (
    <Provider>
        <Context.Consumer>
            {context => <Component context={context} {...props} />}
        </Context.Consumer>
    </Provider>
)

export default withContext