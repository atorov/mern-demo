import React from 'react'
import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

function UserItem(props) {
    // Use React Router hook ---------------------------------------------------
    const history = useHistory()

    // Main renderer ===========================================================
    return (
        <ListItem
            button
            onClick={() => history.push(`/users/${props.user.id}/places`)}
        >
            <ListItemAvatar>
                <Avatar alt={props.user.name} src={props.user.image} />
            </ListItemAvatar>
            <ListItemText
                primary={props.user.name}
                secondary={`${props.user.places === 1 ? 'Place' : 'Places'}: ${props.user.places}`}
            />
        </ListItem>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem
