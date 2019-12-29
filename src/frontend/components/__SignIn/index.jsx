import React from 'react'

import {
    Redirect,
    useLocation,
} from 'react-router-dom'

import Container from '@material-ui/core/Container'

import useAuth from '../../lib/hooks/auth/use-auth'

function SignIn() {
    // Use custom hook ---------------------------------------------------------
    const [isAuth, authRef] = useAuth()

    // Use React Router hook ---------------------------------------------------
    const location = useLocation()

    // Redirect ================================================================
    if (isAuth) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Redirect to={from} />
    }

    // Main renderer ===========================================================
    return (
        <Container>
            Sign in ...
            <br />
            <button
                type="button"
                onClick={() => authRef.current(true, { access_token: 'access_token' })}
            >
                Sign in
            </button>
            <button
                type="button"
                onClick={() => authRef.current(false)}
            >
                Sign out
            </button>
        </Container>
    )
}

export default SignIn
