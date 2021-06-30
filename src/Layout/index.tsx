import { ReactNode } from "react";
import { Flex } from "@chakra-ui/layout";

import { Navbar } from "../components/Navbar";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      maxW="74.375rem"
      minH="100vh"
      margin="0 auto"
      padding="0 1.6rem"
    >
      <Navbar />

      <Flex as="main" flex="1" flexDirection="column" width="100%">
        {children}
      </Flex>
    </Flex>
  );
}
