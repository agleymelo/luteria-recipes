import { ReactNode } from 'react'

import { ChakraProvider } from '@chakra-ui/react'

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <ChakraProvider resetCSS>{children}</ChakraProvider>
}
