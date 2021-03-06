import { ReactNode } from 'react'

import { Box, Flex, ListItem, List } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

type NavDesktopProps = {
  children: ReactNode
}

export function NavDesktop({ children }: NavDesktopProps) {
  const history = useHistory()

  return (
    <Flex width="100%" display={['none', 'none', 'flex', 'flex']} alignItems="center" justifyContent="center">
      <Box width="25%">
        <a href="/">LUTERIA RECIPES</a>
      </Box>

      <Box width="50%">
        <List display="flex" justifyContent="center" alignItems="center">
          <ListItem mr="1.6rem">
            <Text
              as="span"
              fontSize="0.8rem"
              cursor="pointer"
              onClick={() => history.push('/')}
              _hover={{ borderBottom: '1px solid #000', transition: 'all 0.3s linear' }}
            >
              Home
            </Text>
          </ListItem>

          <ListItem mr="1.6rem">
            <Text
              as="span"
              fontSize="0.8rem"
              cursor="pointer"
              onClick={() => history.push('/recipes')}
              _hover={{ borderBottom: '1px solid #000', transition: 'all 0.3s linear' }}
            >
              Recipes
            </Text>
          </ListItem>

          <ListItem mr="1.6rem">
            <Text
              as="span"
              fontSize="0.8rem"
              cursor="pointer"
              _hover={{ borderBottom: '1px solid #000', transition: 'all 0.3s linear' }}
            >
              About Us
            </Text>
          </ListItem>

          <ListItem mr="1.6rem">
            <Text
              as="span"
              fontSize="0.8rem"
              cursor="pointer"
              _hover={{ borderBottom: '1px solid #000', transition: 'all 0.3s linear' }}
            >
              Contact
            </Text>
          </ListItem>
        </List>
      </Box>

      <Flex width="25%" justifyContent="flex-end">
        <List listStyleType="none" display="flex" alignItems="center">
          {children}
        </List>
      </Flex>
    </Flex>
  )
}
