import React from 'react'
import styled from '@emotion/styled'

let H1 = styled.h1({
  color: 'red'
})

let Component = ({ who, className }: { who: string, className?: string }) =>
  <H1 className={className}>Hello, {who}</H1>

const StyledComponent = styled(Component)({
  color: 'green',
})

let App = () => <StyledComponent who="developer!!"/>

export default App
