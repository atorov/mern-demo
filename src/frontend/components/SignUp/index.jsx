import React from 'react'

import {
    Redirect,
    useLocation,
} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'

import useAuth from '../../lib/hooks/auth/use-auth'

const useStyles = makeStyles((theme) => ({
    box: {
        maxWidth: 480,
        margin: 'auto',
    },
    root: {
        margin: `${theme.spacing(4)}px 0 0 0`,
    },
}))

function SignUp() {
    // Use React Router hook ---------------------------------------------------
    const location = useLocation()

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Use custom hook ---------------------------------------------------------
    const [isAuth, authRef] = useAuth()

    // Use state ---------------------------------------------------------------
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')

    // Redirect ================================================================
    if (isAuth) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Redirect to={from} />
    }

    // Main renderer ===========================================================
    return (
        <Container className={classes.root}>
            <Box className={classes.box}>
                <TextField
                    value={name}
                    label="Name"
                    autoFocus
                    fullWidth
                    onChange={(event) => setName(event.target.value)}
                />
                <br />
                <br />
                <TextField
                    value={email}
                    label="E-mail"
                    autoFocus
                    fullWidth
                    onChange={(event) => setEmail(event.target.value)}
                />
                <br />
                <br />
                <TextField
                    value={password}
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    autoFocus
                    fullWidth
                    onChange={(event) => setPassword(event.target.value)}
                />
            </Box>
            <Box className={classes.box} style={{ marginTop: 48 }}>
                <Button
                    disabled={!name || !email || !password}
                    variant="contained"
                    color="primary"
                    style={{ width: '100%' }}
                    onClick={() => {
                        const data = { name, email, password }
                        console.log('::: TODO: data:', data)
                        authRef.current(true, { access_token: 'access_token' })
                    }}
                >
                    Sign up
                </Button>
            </Box>
        </Container>
    )
}

export default SignUp
