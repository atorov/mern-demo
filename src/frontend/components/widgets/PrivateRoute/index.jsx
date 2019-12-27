import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route } from 'react-router-dom'

import useAuth from '../../../lib/hooks/auth/use-auth'

function RenderPropWrapper(ownProps) {
    // Use custom hook ---------------------------------------------------------
    const [isAuth] = useAuth()

    // Component renderer ======================================================
    return (renderProps) => {
        const combinedProps = { ...renderProps, ...ownProps }
        const { PrivateComponent, ...rest } = combinedProps

        if (isAuth) {
            return <PrivateComponent {...rest} />
        }

        return (
            <Redirect
                to={{
                    pathname: '/sign-in',
                    search: combinedProps.location.search,
                    state: { from: combinedProps.location },
                }}
            />
        )
    }
}

const PrivateRoute = (props) => (
    <Route
        {...props}
        render={RenderPropWrapper(props)}
    />
)

PrivateRoute.propTypes = {
    PrivateComponent: PropTypes.any.isRequired,

    location: PropTypes.object,
}

PrivateRoute.defaultProps = {
    location: {},
}

export default PrivateRoute
