import { Button, Heading } from '@rebass/emotion'
import { Box, Flex } from '@rebass/grid/emotion'
import { Route } from 'react-router'

import { MultipleFormStep } from './MultipleFormStep'
import { SimpleFormStep } from './SimpleFormStep'
import { stepsConfig, Steps } from './config'
import { useSteps, ISmartFormAction } from './useSteps'

export let SmartForm = () => {
  let { state, dispatch, getStepPath, next, clearStep } = useSteps()

  let renderFormStep = ({
    Component,
    step,
    nextStep,
    onSelect,
  }: {
    Component: typeof SimpleFormStep | typeof MultipleFormStep
    nextStep: Steps
    step: Steps
    onSelect(a: ISmartFormAction): void,
  }) => () => <Component config={stepsConfig[step]} type={step} onNext={next(nextStep)} onSelect={onSelect} />

  return (
    <Flex flexDirection='column'>
      <Box>
        <Heading>5 simple steps to find your perfect home 🤟</Heading>
        {Object.keys(state).map((key: Steps) => (
          <Button key={key} onClick={clearStep(key)}>
            {state[key].value}
          </Button>
        ))}
      </Box>

      <Route
        path={getStepPath(Steps.CITY)}
        render={renderFormStep({
          Component: SimpleFormStep,
          step: Steps.CITY,
          nextStep: Steps.TYPE,
          onSelect: dispatch,
        })}
      />

      <Route
        path={getStepPath(Steps.TYPE)}
        render={renderFormStep({
          Component: SimpleFormStep,
          step: Steps.TYPE,
          nextStep: Steps.MOVEIN,
          onSelect: dispatch,
        })}
      />

      <Route
        path={getStepPath(Steps.MOVEIN)}
        render={renderFormStep({
          Component: SimpleFormStep,
          step: Steps.MOVEIN,
          nextStep: Steps.DURATION,
          onSelect: dispatch,
        })}
      />

      <Route
        path={getStepPath(Steps.DURATION)}
        render={renderFormStep({
          Component: SimpleFormStep,
          step: Steps.DURATION,
          nextStep: Steps.BUDGET,
          onSelect: dispatch,
        })}
      />

      <Route
        path={getStepPath(Steps.BUDGET)}
        render={renderFormStep({
          Component: MultipleFormStep,
          step: Steps.BUDGET,
          nextStep: Steps.CITY,
          onSelect: dispatch,
        })}
      />

      <Box>Placeholder</Box>
    </Flex>
  )
}
