import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

import UserItem from './UserItem'

const USERS = [
    {
        id: 'uid-1',
        name: 'Robert Doe',
        pics: 3,
    },
    {
        id: 'uid-2',
        name: 'Darwin',
        pics: 0,
    },
    {
        id: 'uid-3',
        name: 'Jane Doe',
        pics: 1,
    },
]

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
    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Main renderer ===========================================================
    const users = USERS // TODO:

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
        </Container>
    )
}

export default Users
