export const enum Steps {
  CITY = 'city',
  TYPE = 'type',
  MOVEIN = 'moveIn',
  DURATION = 'duration',
  BUDGET = 'budget',
}

// export type SingleSteps = Steps.CITY | Steps.TYPE | Steps.MOVEIN

// export interface ISmartFormAction {
//   key: string
//   type: Steps | 'clear'
//   value?: string
// }

export interface ISmartFormStep {
  actions: ISmartFormStepSimpleAction | ISmartFormStepFromToAction
  title: string
}

export interface ISmartFormStepSimpleAction {
  [key: string]: {
    value: string,
  }
}

export interface ISmartFormStepFromToAction {
  [key: string]: {
    from: string
    to: string,
  }
}

/* tslint:disable:object-literal-sort-keys */
export const stepsConfig = {
  [Steps.CITY]: {
    title: 'Where would you like to live?',
    actions: [
      { key: 'boston', value: 'Boston' },
      { key: 'new-york', value: 'New York City' },
      { key: 'washington', value: 'Washington' },
    ],
  },
  [Steps.TYPE]: {
    title: 'What type of home are you interested in?',
    actions: [{ key: 'entire', value: 'Entire apartment' }, { key: 'room', value: 'Private room' }],
  },
  [Steps.MOVEIN]: {
    title: 'When would you like to move-in?',
    actions: [{ key: '0-14', value: 'Next 14 days' }, { key: '15-30', value: 'Next 15-30 days' }],
  },
  [Steps.DURATION]: {
    title: 'What is your duration of stay?',
    actions: [
      { key: '1-3', value: '1–3 months' },
      { key: '3-6', value: '3-6 months' },
      { key: '6-11', value: '6-11 months' },
      { key: '12+', value: '12 months or more' },
    ],
  },
  [Steps.BUDGET]: {
    title: "What's your budget?",
    desc: 'You can select multiple price ranges.',
    actions: [{ key: '1000-1400', from: 1000, to: 1400 }, { key: '1400-1600', from: 1400, to: 1600 }],
  },
}

export type StepsConfig = typeof stepsConfig
