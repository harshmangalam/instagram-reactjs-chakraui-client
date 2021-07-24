import { Box, HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'

function UserSkelton() {
    return (
        <Box>
            <HStack>
                <SkeletonCircle size="10" />
                <Skeleton w="32" h="4" />
            </HStack>
        </Box>
    )
}

export default UserSkelton
