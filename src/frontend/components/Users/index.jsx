import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'

import UsersList from '../UsersList'

const USERS = [
    {
        id: 'uid-1',
        name: 'John Doe',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        pics: 3,
    },
    {
        id: 'uid-2',
        name: 'Darwin Waters',
        image: 'https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        pics: 0,
    },
    {
        id: 'uid-3',
        name: 'Jane Doe',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=women-s-white-and-black-button-up-collared-shirt-774909.jpg&fm=jpg',
        pics: 1,
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: `${theme.spacing(6)}px 0 0 0`,
    },
}))

function Users() {
    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Main renderer ===========================================================
    return (
        <Container className={classes.root}>
            <UsersList users={USERS} />
        </Container>
    )
}

export default Users
