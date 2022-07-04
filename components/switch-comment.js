//? SWITCH COMPONENT FROM THE MANTINE FRAMEWORK
//? USED IN TABLE-ROW-COMMENTS.JS
//? SETS PUBLISHED TO TRUE OR FALSE IN THE DATABASE

import { useState } from 'react'
import { Switch, SWITCH_SIZES } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import axios from 'axios'

const CommentSwitch = ({ published, commentId }) => {

    const [checked, setChecked] = useState(published);
    const notifications = useNotifications();

    const handleChange = async (e) => {
        setChecked(e.currentTarget.checked)
        await axios.put('/api/comments/set-status', {
            commentId: commentId,
            isPublished: e.currentTarget.checked
        })
        //notifs here
        if (!checked) {
            notifications.showNotification({
                color: 'green',
                title: 'Comment published',
                message: 'The comment was published',
            })
        }
        if (checked) {
            notifications.showNotification({
                color: 'red',
                title: 'User deactivated',
                message: 'The comment was moderated',
            })
        }
    }

    return (
        <Switch checked={checked} onChange={(e) => handleChange(e)} color="dark" />
    )
}

export default CommentSwitch