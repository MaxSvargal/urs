import styled from '@emotion/styled'
import { Box, Flex } from '@rebass/grid/emotion'
import facepaint from 'facepaint'

const breakpoints = [576, 768, 992, 1200]

const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

export let HomeRootGrid = styled(Box)(
  mq({
    fontSize: ['16px', '18px', '20px', '22px'], // TODO: manipulate this property dynamicaly, all sized will be increased for bigger resolution
    display: 'grid',
    gridTemplate: [`
      [row1-start] "header header header header header" 1fr [row1-end]
      [row2-start] "content content content content content" auto [row2-end]
      [row3-start] "footer footer footer footer footer" 1fr [row3-end]
      / repeat(5, 1fr)
    `, `
      [row1-start] "header header" 1fr [row1-end]
      [row2-start] "content content-side" auto [row2-end]
      [row3-start] "footer footer" 1fr [row3-end]
      / repeat(2, 1fr)
    `],
    minWidth: '100vw',
    minHeight: '100vh',
    gridColumnGap: '1rem',
  }),
)

export let ContentGrid = styled(Box)(
  mq({
    gridArea: ['1 / 1 / 3 / 3', '2 / 2 / 5 / 5', '3 / 3 / 5 / 5'], // 'content',
    alignSelf: 'center',
    justifySelf: 'stretch',
    fontSize: '1rem',
  }),
)

export let ContentHalfGrid = styled(Box)(
  mq({
    gridArea: ['1 / 1 / 3 / 3', '2 / 2 / 5 / 5', '3 / 3 / 5 / 5'], // 'content',
    alignSelf: 'center',
    justifySelf: 'stretch',
    fontSize: '1rem',
  }),
)

export let HeaderGrid = styled(Box)(
  mq({
    gridArea: ['1 / 1 / 3 / 3', '2 / 2 / 5 / 5', '3 / 3 / 5 / 5'], // 'content',
    alignSelf: 'center',
    justifySelf: 'stretch',
    fontSize: '1rem',
  }),
)

export let FooterGrid = styled(Box)(
  mq({
    gridArea: ['1 / 1 / 3 / 3', '2 / 2 / 5 / 5', '3 / 3 / 5 / 5'], // 'content',
    alignSelf: 'center',
    justifySelf: 'stretch',
    fontSize: '1rem',
  }),
)
