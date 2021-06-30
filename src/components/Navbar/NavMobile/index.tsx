import { ReactNode, useState } from 'react'

import { Box, Flex, ListItem, List } from '@chakra-ui/layout'
import { IconButton, Text, useColorMode } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

type NavMobileProps = {
  children: ReactNode
}

export function NavMobile({ children }: NavMobileProps) {
  const [display, setDisplay] = useState('none')

  const { colorMode } = useColorMode()

  const isLightMode = colorMode === 'light'

  return (
    <>
      <Flex width="100%" alignItems="center" display={['flex', 'flex', 'none', 'none']}>
        <Box width="50%" fontSize="0.8rem">
          <a href="/">LUTERIA RECIPES</a>
        </Box>

        <Flex width="50%" justifyContent="flex-end" alignItems="center" display={['flex', 'flex', 'none', 'none']}>
          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            bgColor="transparent"
            icon={<HamburgerIcon />}
            display={['flex', 'flex', 'none', 'none']}
            onClick={() => setDisplay('flex')}
            _pressed={{
              border: 'none'
            }}
          />

          {children}
        </Flex>
      </Flex>

      {/* Mobile Content */}
      <Flex
        display={display}
        w="100vw"
        h="100vh"
        bgColor={`${isLightMode ? 'gray.100' : 'black'}`}
        pos="fixed"
        top="0"
        left="0"
        zIndex={20}
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <IconButton
            aria-label="Close Menu"
            mt={2}
            mr={2}
            bgColor="transparent"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => setDisplay('none')}
            _pressed={{
              border: 'none'
            }}
          />
        </Flex>

        <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
          <List display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <ListItem my={4}>
              <Text as="span" fontSize="1.2rem">
                Home
              </Text>
            </ListItem>

            <ListItem my={4}>
              <Text as="span" fontSize="1.2rem">
                Recipes
              </Text>
            </ListItem>

            <ListItem my={4}>
              <Text as="span" fontSize="1.2rem">
                About Us
              </Text>
            </ListItem>

            <ListItem my={4}>
              <Text as="span" fontSize="1.2rem">
                Contact
              </Text>
            </ListItem>
          </List>
        </Flex>
      </Flex>
    </>
  )
}
