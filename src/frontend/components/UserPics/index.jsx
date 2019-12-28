import React from 'react'

import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'

import UserPicsList from '../UserPicsList'

const PICS = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        image: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        meta: {
            creator: 'uid-1',
            status: 'active',
        },
    },
    {
        id: 'p2',
        title: 'Paper Map',
        description: 'Paper map and a ceramic coup',
        image: 'https://images.pexels.com/photos/2678301/pexels-photo-2678301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        meta: {
            creator: 'uid-2',
            status: 'active',
        },
    },
    {
        id: 'p3',
        title: 'Bridge',
        description: 'Gray bridge and trees',
        image: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        meta: {
            creator: 'uid-3',
            status: 'active',
        },
    },
    {
        id: 'p4',
        title: 'Plane',
        description: 'White plane beside clouds',
        image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        meta: {
            creator: 'uid-1',
            status: 'active',
        },
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: `${theme.spacing(6)}px 0 0 0`,
    },
}))

function UserPics() {
    // Use React Router hook ---------------------------------------------------
    const params = useParams()

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Main renderer ===========================================================
    const pics = PICS.filter((pic) => pic.meta.creator === params.uid)

    return (
        <Container className={classes.root}>
            <UserPicsList pics={pics} />
        </Container>
    )
}

export default UserPics
