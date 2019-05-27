import { Button, Heading } from '@rebass/emotion'
import { Box, Flex } from '@rebass/grid/emotion'
import { useCallback, FC } from 'react'

import { ISmartFormAction, Steps } from '../config'
import { useMultipleStepsReducer } from '../hooks/useMultipleStepsReducer'

// TODO: Move to reducer
interface IActionType {
  type: 'reset' | 'decrement' | 'increment'
}

export interface IAction {
  from: number
  key: string
  to: number
}

export interface IConfig {
  actions: IAction[]
  title: string
}

let ToggleButton = ({ text, onClick, isActive }: { isActive: boolean; text: string; onClick(): void }) => (
  <Button onClick={onClick} data-active={isActive}>
    {text}
  </Button>
)

interface IMultipleFormStepProps {
  config: IConfig
  type: Steps
  onNext(): void
  onSelect(a: ISmartFormAction): void
}

export let MultipleFormStep: FC<IMultipleFormStepProps> = ({ config, type, onNext, onSelect }) => {
  let [selected, toggle, isActive, getResult] = useMultipleStepsReducer()

  let onFinalize = useCallback(() => {
    onSelect(getResult(type, config, selected))
    onNext()
  }, [selected])

  return (
    <Box>
      <Heading>{config.title}</Heading>
      <Flex>
        {config.actions.map(action => (
          <ToggleButton
            onClick={toggle(action)}
            key={action.key}
            isActive={isActive(action)}
            text={`$${action.from} — $${action.to}`}
          />
        ))}
      </Flex>
      <Button onClick={onFinalize}>Finalize</Button>
    </Box>
  )
}
