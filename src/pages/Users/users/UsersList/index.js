import React, { Fragment, PureComponent } from 'react'
import { Query } from 'react-apollo'
import { GET_BONDS } from 'queries'
import { findIndex } from 'lodash'
import { Menu, Spinner } from 'components'
import UserItem from './userslist/UserItem'

class UsersList extends PureComponent {

    state = {
        filter: null,
    }

    componentWillReceiveProps = nextProps => {
        console.log('nextProps', nextProps)
    }

    toggleFilter = () => {
        this.setState({ filter: this.state.filter ? null : 'bonded' })
    }

    setFilter = filter => {
        this.setState({ filter })
    }

    filterUsers = bonds => {
        const { filter } = this.state
        const { users } = this.props
        if (filter === 'bonded') {
            return users.filter(user => {
                const bond = this.getBond(user, bonds)
                return bond && bond.confirmed
            })
        }
        return users
    }

    getBond = (user, bonds) => {
        const { currentUser } = this.props
        let index = findIndex(bonds, { sender: user._id, responder: currentUser._id })
        if (index < 0) index = findIndex(bonds, { responder: user._id, sender: currentUser._id })
        return (index > -1) ? bonds[index] : null
    }

    render() {
        const { currentUser } = this.props
        const menuOptions = [
            {
                label: 'Following',
                onClick: () => this.setFilter('bonded'),
                active: this.state.filter === 'bonded'
            },
            {
                label: 'All',
                onClick: () => this.setFilter(null),
                active: !this.state.filter
            }
        ]
        return (
            <Fragment>
                <Menu
                    itemHeight={40}
                    options={menuOptions}
                    inline
                />
                <Query query={GET_BONDS}>
                    {({ data, loading, error }) => {
                        
                        if (loading) return <Spinner />
                        if (error) return <div className='error'>Error: {error}</div>

                        const bonds = data.getBonds
                        const filteredUsers = this.filterUsers(bonds)
                        
                        return (
                            <ul className='users'>
                                {filteredUsers && filteredUsers.map((user, index) => {
                                    const bond = this.getBond(user, bonds)
                                    return (
                                        <li key={index}>
                                            <UserItem
                                                user={user}
                                                bond={bond}
                                                isCurrentUser={user._id === currentUser._id}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                    }}
                </Query>
            </Fragment>
        )
    }
}

export default UsersList