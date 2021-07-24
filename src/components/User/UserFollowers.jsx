import { Box, Button } from '@chakra-ui/react'
import React from 'react'

function UserFollowers({user}) {
    return (
        <Box>
             <Button variant="ghost" size="sm">{user.edges.followers?.length || 0} Followers</Button>
        </Box>
    )
}

export default UserFollowers
