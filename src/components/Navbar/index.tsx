import { useState } from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import {
  Button,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

import { AiOutlineUser } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import { useAuth } from '../../hook/useAuth'

import { NavDesktop } from './NavDesktop'
import { NavMobile } from './NavMobile'

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const { session, handleSignInWithGoogle, handleSignOut } = useAuth()

  const isLightMode = colorMode === 'light'

  function toggleModal() {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <Box as="header" w="100%" h="4.0rem">
      <Flex as="nav" justifyContent="space-beetwen" alignItems="center" height="100%">
        {/* Mobile */}
        <NavMobile>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              aria-label="Menu User"
              icon={<AiOutlineUser />}
              variant="outline"
              border="none"
              _pressed={{
                border: 'none'
              }}
            />

            <MenuList>
              {session ? (
                <MenuGroup title="Profile">
                  <MenuItem>Profile</MenuItem>
                  <MenuItem color="red.500" onClick={toggleModal}>
                    Sign Out
                  </MenuItem>
                </MenuGroup>
              ) : (
                <>
                  <MenuItem onClick={toggleModal}>Sign In</MenuItem>
                </>
              )}
              <MenuDivider />
              <MenuGroup title="Theme">
                <MenuItem onClick={toggleColorMode}>
                  {colorMode === 'light' ? (
                    <>
                      <MoonIcon h="4" w="4" mr="0.4rem" /> Dark
                    </>
                  ) : (
                    <>
                      <SunIcon h="4" w="4" mr="0.4rem" /> Light
                    </>
                  )}
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </NavMobile>

        {/* Desktop */}
        <NavDesktop>
          <Menu closeOnSelect={true} placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="Menu User"
              icon={<AiOutlineUser />}
              border="none"
              bgColor="transparent"
              _active={{
                borderRadius: '4px'
              }}
              _hover={{}}
              _focus={{}}
              _click={{}}
              _pressed={{
                border: 'none'
              }}
            />
            <MenuList>
              {session ? (
                <MenuGroup title="Profile">
                  <MenuItem>Profile</MenuItem>
                  <MenuItem color="red.500" onClick={toggleModal}>
                    Sign Out
                  </MenuItem>
                </MenuGroup>
              ) : (
                <>
                  <MenuItem onClick={toggleModal}>Sign In</MenuItem>
                </>
              )}
              <MenuDivider />
              <MenuGroup title="Theme">
                <MenuItem onClick={toggleColorMode}>
                  {colorMode === 'light' ? (
                    <>
                      <MoonIcon h="4" w="4" mr="0.4rem" /> Dark
                    </>
                  ) : (
                    <>
                      <SunIcon h="4" w="4" mr="0.4rem" /> Light
                    </>
                  )}
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </NavDesktop>
      </Flex>

      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onEsc={() => setIsOpenModal(false)} isCentered>
        <ModalOverlay />
        <ModalContent padding="0.8rem">
          <ModalHeader textAlign="center">{session ? 'Do you want to log out?' : 'Sign In'}</ModalHeader>
          <ModalCloseButton _focus={{}} _hover={{ background: 'gray.200', transition: 'background 0.4s linear' }} />
          <ModalBody>
            {session ? (
              <></>
            ) : (
              <>
                <Text textAlign="center">Choose one of the methods below to login</Text>
              </>
            )}
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center" alignItems="center">
            {session ? (
              <>
                <Button
                  bgColor="transparent"
                  border="1px solid #CBD5E0"
                  color={isLightMode ? 'black' : 'white'}
                  onClick={() => setIsOpenModal(false)}
                  marginRight="1.2rem"
                  _hover={{
                    transition: 'all 0.3s ease-in-out',
                    filter: 'brightness(0.8)'
                  }}
                  _click={{}}
                >
                  Cancel
                </Button>

                <Button
                  bgColor="red.500"
                  color="white"
                  onClick={handleSignOut}
                  _hover={{
                    color: `${isLightMode ? 'black' : 'white'}`,
                    background: 'transparent',
                    border: '1px solid #E53E3E',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  _click={{}}
                >
                  Yes
                </Button>
              </>
            ) : (
              <>
                <Button
                  leftIcon={<FcGoogle />}
                  bgColor="transparent"
                  border="1px solid #E53E3E"
                  color={isLightMode ? 'black' : 'white'}
                  onClick={handleSignInWithGoogle}
                  _hover={{
                    transition: 'all 0.3s ease-in-out',
                    filter: 'brightness(0.8)'
                  }}
                  _click={{}}
                >
                  Sign In With Google
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
