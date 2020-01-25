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

import { Alert, AlertTitle } from '@material-ui/lab'

import useAuth from '../../lib/hooks/auth/use-auth'
import useMyRequest from '../../lib/hooks/my-request/use-my-request'

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
    // Use state ---------------------------------------------------------------
    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')

    // Use React Router hook ---------------------------------------------------
    const location = useLocation()

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Use custom hook ---------------------------------------------------------
    const [isAuth, auth] = useAuth()
    const myRequest = useMyRequest()

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
                    onClick={async () => {
                        const data = { name, email, password }
                        // let signUpResponse
                        try {
                            // signUpResponse =
                            await myRequest('http://localhost:5000/api/users/sign-up', {
                                method: 'POST',
                                data,
                            })

                            auth(true, { access_token: 'access_token' }) // TODO:
                        }
                        catch (reason) {
                            setError(reason)
                            console.error('::: [sign up] Error:', reason)
                        }
                    }}
                >
                    Sign up
                </Button>

            </Box>

            {error ? (
                <Box className={classes.box} style={{ marginTop: 48 }}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                </Box>
            ) : null}
        </Container>
    )
}

export default SignUp
