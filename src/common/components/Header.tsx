import styled from '@emotion/styled'
import { Card, Heading, Image, Text } from '@rebass/emotion'
import { Box, Flex } from '@rebass/grid/emotion'

export const HoverBox = styled(Box)
  (({ cursor }: { cursor: 'pointer' | 'normal' }) => ({ cursor }))

export const ShadowedCard = styled(Card)
  ({ borderRadius: 2, boxShadow: '0 0 16px rgba(0, 0, 0, .25)' })

export const MicroText = styled(Text)
  ({ fontSize: 2 })

export default () =>
  <Flex>
    <Box width={1 / 2} px={2}>
      <ShadowedCard p={1}>
        <Image src={''} />
        <HoverBox px={2} cursor='pointer'>
          <Heading as='h3'>
            Card
          </Heading>
          <MicroText>
            Small meta text
          </MicroText>
        </HoverBox>
      </ShadowedCard>
    </Box>
    <Box width={1 / 2}>
      <Text>Some Text</Text>
    </Box>
  </Flex>
