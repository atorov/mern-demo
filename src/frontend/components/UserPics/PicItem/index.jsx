import React from 'react'
import PropTypes from 'prop-types'

import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { AuthStateContext } from '../../App/AuthStateProvider'

import DialogEdit from './DialogEdit'

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
    // Use context -------------------------------------------------------------
    const authState = React.useContext(AuthStateContext)

    // Use state ---------------------------------------------------------------
    const [isDialogOpened, setDialogOpened] = React.useState(false)

    // Use React Router hook ---------------------------------------------------
    const params = useParams()

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Main renderer ===========================================================
    return (
        <>
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

                {authState.user && authState.user.id === params.uid ? (
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
                            onClick={() => setDialogOpened(true)}
                        >
                            Edit
                        </Button>
                    </CardActions>
                ) : null}
            </Card>

            <DialogEdit
                isOpened={isDialogOpened}
                pic={props.pic}
                handleClose={() => {
                    setDialogOpened(false)
                    // picsDispatch({
                    //     type: ':picsState/SET:',
                    //     payload: {
                    //         ...picsState,
                    //         status: ':GET_STARTED:',
                    //     },
                    // })
                    // TODO:
                }}
            />
        </>
    )
}

PicItem.propTypes = {
    pic: PropTypes.object.isRequired,
}

export default PicItem
