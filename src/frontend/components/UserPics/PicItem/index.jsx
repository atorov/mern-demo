import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    cardActionButton: {
        display: 'block',
    },
    cardActions: {
        justifyContent: 'space-between',
    },
    root: {
        width: 345,
        minWidth: 345,
        maxWidth: 345,
        margin: theme.spacing(2),
    },
}))

function PicItem(props) {
    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Main renderer ===========================================================
    return (
        <Card className={classes.root}>
            <CardMedia
                component="img"
                alt={props.pic.title}
                height="140"
                image={props.pic.image}
                title={props.pic.title}
            />
            <CardContent>
                <Typography>
                    {props.pic.title}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    color="secondary"
                    className={classes.cardActionButton}
                >
                    Delete
                </Button>
                <Button
                    size="small"
                    color="primary"
                    className={classes.cardActionButton}
                >
                    Edit
                </Button>
            </CardActions>
        </Card>
    )
}

PicItem.propTypes = {
    pic: PropTypes.object.isRequired,
}

export default PicItem
