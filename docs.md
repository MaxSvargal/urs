# Documentation

- [Structure](#structure)
- [Styled Components](#styled-components)
    - [Atomic components with Rebass and Rebass Grid](#rebass-and-rebass-grid)
    - [Extending styled components with Emotion](#extending-styled-components-with-emotion)

- [State Management](#state-management)
    - [Universal state management](#universal-state-management)
    - [Local state management](#local-state-management)

- [Tips](#tips)

## Structure

- `build` Output of webpack compilations
- `public` Static assets available at http root
- `src` Application source
    - `index.ts` Server-side HMR entry point
    - `client` Specific client side code and enty point
    - `server` Specific server side code and enty point
    - `common` Common applicattion code
        - `App.ts` React appilication entry point
        - `GlobalStyles.tsx` Global style tag component for html, body, font-faces etc.
        - `styled.ts` Configuration of styled components, there are media queries breakpoints, font sizes, theme and other configs
        - `models` TypeScript definitions of application models and collections
        - `store` Redux store
            - `configureStore.ts` Universal redux store configurator
            - `typings` Store-specific types of application actions and state. You don't need to import anything from here, it's already initialized.
        - `shared` Shared modules of the  application level, the same structure as the feature.
            - `actions` Redux actions
            - `reducers` Redux reducers
            - `hooks` React hooks
                - `usePrefetch` Hook for prefetch data on server-side
            - `components` React components
                - `atoms` Module that exports all shared styled components in this directory and basic rebass components like Flex, Box, Text, Image etc.
                - `content` Content-specific styled components
                - `inputs` Inputs styled components
                - `layout` Layout styled components
                - `typography` Text styled components
        - `{feature}` Feature parts of the application: pages, header, footer etc.
            - `components` Specific components of the feature
            - `hooks` Specific hooks of the feature
            - `images` Specific images and icons of the feature
            - `index.ts` Entry point of the feature. There is a public interface for all exported stuff. Don't import anything from the inside, only from here instead.

#### Path aliases
Path aliases are configured in `tsconfig.json` in the `paths` part. Webpack plugin gets them and converts them to an self specific format. You don't need to manage it in webpack.
- `~/*` -> `/src/common/*`
- `components/*` -> `/src/common/shared/components/*`
- `hooks/*` -> `/src/common/shared/hooks/*`

#### Shared components importing
Import all shared styled components from the entry point `components/atoms` instead of importing them directly from their modules.

---
## Styled Components

### Atomic components with [Rebass](https://rebassjs.org/) and [Rebass Grid](https://grid.rebassjs.org/)
Instead of using html tags directly, we're use atomic UI components that help us to realize the [Patterns for Style Composition in React](https://jxnblk.com/blog/patterns-for-style-composition-in-react/) and give us better components semantic structure. Every atomic component have the strictly defined properties. If you need more styles, then it's time to create a new styled component that extends the underlying atom.

**What we have:**
Flex, Box ,Text, Heading, Button, Link, Image, Card

That's all that we need.
For more details, please, read the documentation: https://rebassjs.org/getting-started

**Example:**
```jsx
<Flex flexDirection='column' justifyContent='center'>
    <Box flexBasis={1/2}>
        <Card fontWeight='bold' my={5}>
            Some content...
        </Card>
    </Box>
    <Box flexBasis={1/2}>
        <Card fontSize={6} width={[ 1, 1, 1/2 ]}>
            Another content...
        </Card>
    </Box>
</Flex>
```

### Extending styled components with [Emotion](https://emotion.sh/)
Sometimes we need to style components more deeply. Well, let't extend our atoms!
Yoy can use theme prop to get the configuration. 

```js
import styled from '~/styled'
import { Link } from 'components/atoms'

export const UnstyledLink = styled(Link)(({ theme }) => ({
  color: theme.color.white,
  textDecoration: 'none',
}))
```

Also we can wrap styles in `mq` (media query) helper and use media values as arrays of css props.

```js
import styled, { mq } from '~/styled'

export const RelativeCard = styled(Box)(
  mq({
    display: 'grid',
    gridTemplate: '20px auto auto auto 20px / 20px minmax(0, 1fr) 20px',
    justifyItems: [ 'baseline', 'baseline', 'center', 'center' ],
    borderRadius: 6,
    marginBottom: 40,
    flexBasis: ['100%', '50%', '50%', '33%'],
  }),
)
```

You also can write in css-style with js tag template. Just install [styled-components extention](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components) for your IDE.

```js
import styled from '~/styled'
import { Link } from 'components/atoms'

export const StyledUnstyledLink = styled(Link)`
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primaryBg};
    text-decoration: none;
`
```

Store styled components separately next by the parent component and use `Styled` postfix in the file name. For example `DatePicker.tsx` and `DatePickerStyles.ts`
Don't use a `tsx` extention if you don't use JSX inside of a module.

### CSS Modules
You can use css modules as usually. Just import it and use `className`.

```js
import styles from './myStyles.css'

export const MyComponent = () => (
    <div className={styles.root}>
        <h1 className={styles.heading}>Header</h1>
        <a className={`${styles.normalLink} ${styles.linkButton}`}>My link</a>
    </div>
)
```

---
## State Management
### Universal state management
### Local state management

## Tips

You don't need to import `React` in every tsx module. It avaliable globally.

Sometimes you need to check a current enviroment. You can do it easy with `proccess.env.BROWSER`:
```js
const { BROWSER } = process.env

if (BROWSER) execSpecificFunction()
```
