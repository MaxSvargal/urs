import { Button, Heading } from '@rebass/emotion'
import { Box, Flex } from '@rebass/grid/emotion'
import { useCallback, FC } from 'react'

import { ISmartFormAction, Steps } from '../config'

export interface ISimpleFormStepProps {
  config: {
    actions: Array<{
      key: string
      value: string,
    }>
    title: string,
  }
  type: Steps
  onNext(): void
  onSelect(a: ISmartFormAction): void
}

export let SimpleFormStep: FC<ISimpleFormStepProps> = ({ config, type, onNext, onSelect }) => (
  <Box>
    <Heading>{config.title}</Heading>
    <Flex>
      {config.actions.map(action => (
        <Button
          onClick={useCallback(() => {
            onSelect({ ...action, type })
            onNext()
          }, [])}
          key={action.key}>
          {action.value}
        </Button>
      ))}
    </Flex>
  </Box>
)
