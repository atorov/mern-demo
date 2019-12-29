import React from 'react'

import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import PicItem from './PicItem'

const PICS = [
    {
        id: 'p1',
        title: 'Empire State Building',
        image: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        meta: {
            creator: 'uid-1',
        },
    },
    {
        id: 'p2',
        title: 'Bridge',
        image: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        meta: {
            creator: 'uid-3',
        },
    },
    {
        id: 'p3',
        title: 'Plane',
        image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        meta: {
            creator: 'uid-1',
        },
    },
    {
        id: 'p4',
        title: 'Plane #2',
        image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        meta: {
            creator: 'uid-1',
        },
    },
    {
        id: 'p6',
        title: 'Paper Map',
        image: 'https://images.pexels.com/photos/2678301/pexels-photo-2678301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        meta: {
            creator: 'uid-1',
        },
    },
]

const useStyles = makeStyles((theme) => ({
    box: {},
    pics: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    root: {
        margin: `${theme.spacing(4)}px 0 0 0`,
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
            <Box className={classes.box}>
                {
                    pics.length
                        ? (
                            <div className={classes.pics}>
                                {pics.map((pic) => <PicItem key={pic.id} pic={pic} />)}
                            </div>
                        )
                        : (
                            <Typography variant="h6" align="center">
                                No pics found
                            </Typography>
                        )
                }
            </Box>
        </Container>
    )
}

export default UserPics
