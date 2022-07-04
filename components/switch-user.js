//? SWITCH COMPONENT FROM THE MANTINE FRAMEWORK
//? USED IN TABLE-ROW-USERS.JS
//? SETS ACTIVE TO TRUE OR FALSE IN THE DATABASE

import { useState } from 'react'
import { Switch, SWITCH_SIZES } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import axios from 'axios'

const UserSwitch = ({ isActive, userId }) => {

    const [checked, setChecked] = useState(isActive);
    const notifications = useNotifications();

    const handleChange = async (e) => {
        setChecked(e.currentTarget.checked)
        await axios.put('/api/users/set-status', {
            userId: userId,
            isActive: e.currentTarget.checked
        })
        //notifs here
        if (!checked) {
            notifications.showNotification({
                color: 'green',
                title: 'User activated',
                message: 'The user was activated',
            })
        }
        if (checked) {
            notifications.showNotification({
                color: 'red',
                title: 'User deactivated',
                message: 'The user was deactivated',
            })
        }
    }

    return (
        <Switch checked={checked} onChange={(e) => handleChange(e)} color="dark"/>
    )
}

export default UserSwitch
