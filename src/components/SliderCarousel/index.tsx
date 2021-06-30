import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { Carousel } from 'react-responsive-carousel'

import carousel_data from '../../data/carousel.data.json'

export function SliderCarousel() {
  return (
    <Carousel
      infiniteLoop
      autoPlay
      showArrows
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      transitionTime={500}
      interval={5500}
    >
      {carousel_data.map(item => {
        return (
          <Box key={item.id} width="100%">
            <Flex
              style={{ backgroundImage: `url(${item.image})` }}
              backgroundPosition="center center"
              backgroundSize="cover"
              width="100%"
              height="500px"
              // opacity="0.7"
              mt="0.8rem"
              borderRadius="0.8rem"
              filter="grayscale(30%)"
            >
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
                paddingRight="1.6rem"
                paddingLeft="1.6rem"
              >
                <Flex flexDirection="column">
                  <Heading as="h2" fontSize="1.6rem" fontWeight="normal" color="black">
                    Luteria Recipes
                  </Heading>

                  <Text as="span" fontSize="1.2rem" mt="0.8rem" color="black">
                    Here you will find recipes to make a snack, a special lunch, sweets and much more
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        )
      })}
    </Carousel>
  )
}
