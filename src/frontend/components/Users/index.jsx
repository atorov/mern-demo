import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

import { Alert, AlertTitle } from '@material-ui/lab'

import useMyRequest from '../../lib/hooks/my-request/use-my-request'

import UserItem from './UserItem'

const useStyles = makeStyles((theme) => ({
    box: {},
    list: {
        maxWidth: 480,
        margin: 'auto',
    },
    root: {
        margin: `${theme.spacing(4)}px 0 0 0`,
    },
}))

function Users() {
    // Use state ---------------------------------------------------------------
    const [error, setError] = React.useState('')
    const [users, setUsers] = React.useState([])

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Use custom hook ---------------------------------------------------------
    const myRequest = useMyRequest()

    // Use effect --------------------------------------------------------------
    React.useEffect(() => {
        (async () => {
            let usersData
            try {
                usersData = (await myRequest('http://localhost:5000/api/users')).data
            }
            catch (reason) {
                setError(reason)
                console.error('::: [auth] Error:', reason)
                return
            }

            setUsers(usersData)
        })()
    }, [myRequest])

    // Main renderer ===========================================================
    return (
        <Container className={classes.root}>
            <Box className={classes.box}>
                {
                    users.length
                        ? (
                            <List component="nav" className={classes.list}>
                                {users.map((user) => <UserItem key={user.id} user={user} />)}
                            </List>
                        )
                        : (
                            <Typography variant="h6" align="center">
                                No users found
                            </Typography>
                        )
                }
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

export default Users
