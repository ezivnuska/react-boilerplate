import React from 'react'
import {
    GET_BONDS
} from 'queries'
import { Query } from 'react-apollo'

const withBonds = Component => props => {
    console.log('props', props)
    return (
        <Query query={GET_BONDS}>
            {({ data, loading, refetch })=> {
                if (loading) return null
                console.log('data', data)
                return (
                    <Component {...props} refetch={refetch} bonds={data} />
                )
            }}
        </Query>
    )
}

export default withBonds