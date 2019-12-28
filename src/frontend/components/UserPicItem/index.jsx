import React from 'react'
import PropTypes from 'prop-types'

// import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 345,
        minWidth: 345,
        maxWidth: 345,
        margin: theme.spacing(2),
    },
}))

function UserPicItem(props) {
    // Use React Router hook ---------------------------------------------------
    // const history = useHistory()

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Main renderer ===========================================================
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => console.log('::: TODO:')}>
                <CardMedia
                    component="img"
                    alt={props.pic.title}
                    height="140"
                    image={props.pic.image}
                    title={props.pic.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.pic.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" component="p" gutterBottom>
                        {props.pic.meta.creator}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.pic.description || ''}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" size="small" color="secondary">
                    Delete
                </Button>
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    )
}

UserPicItem.propTypes = {
    pic: PropTypes.object.isRequired,
}

export default UserPicItem
