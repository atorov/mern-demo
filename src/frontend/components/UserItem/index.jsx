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
            onClick={() => history.push(`/users/${props.user.id}/pics`)}
        >
            <ListItemAvatar>
                <Avatar alt={props.user.name} src={props.user.image} />
            </ListItemAvatar>
            <ListItemText
                primary={props.user.name}
                secondary={`${props.user.pics === 1 ? 'Picture' : 'Pictures'}: ${props.user.pics}`}
            />
        </ListItem>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem
