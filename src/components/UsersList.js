import React from 'react';
import PropTypes from 'prop-types';

export const UsersList = (props) => {
    UsersList.propTypes = {
        users: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string,
            age: PropTypes.number
        })),
        updateUser:()=> PropTypes.number()

    };

    return (<ul>

        {props.users.length &&
        (props.users.map(user => (
            <li key={user.id} onClick={props.updateUser.bind(null,user.id)}>{user.id}:{user.username} -- {user.age}</li>
        )))}
    </ul>);
}

