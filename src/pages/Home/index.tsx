import { Box, Heading } from '@chakra-ui/react'

import { Layout } from '../../Layout'
import { SliderCarousel } from '../../components/SliderCarousel'

export function Home() {
  return (
    <Layout>
      <SliderCarousel />

      <Box mt="0.8rem" as="section" width="100%">
        <Heading mt="0.8rem" as="h2" fontSize="1.8rem" fontWeight="normal" textAlign="center">
          👨‍🍳 Recipes
        </Heading>
      </Box>
    </Layout>
  )
}
