//? SWITCH COMPONENT FROM THE MANTINE FRAMEWORK
//? USED IN TABLE-ROW-POSTS.JS
//? SETS PUBLISHED TO TRUE OR FALSE IN THE DATABASE

import { useState } from 'react'
import { Switch, SWITCH_SIZES } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import axios from 'axios'

const PostSwitch = ({ published, postId }) => {

    const [checked, setChecked] = useState(published);
    const notifications = useNotifications();

    const handleChange = async (e) => {
        setChecked(e.currentTarget.checked)
        await axios.put('/api/posts/set-status', {
            postId: postId,
            published: e.currentTarget.checked
        })
        if (!checked) {
            notifications.showNotification({
                color: 'green',
                title: 'User activated',
                message: 'The post was activated',
            })
        }
        if (checked) {
            notifications.showNotification({
                color: 'red',
                title: 'User deactivated',
                message: 'The post was deactivated',
            })
        }
    }

    return (
        <Switch checked={checked} onChange={(e) => handleChange(e)} color="dark"/>
    )
}

export default PostSwitch
