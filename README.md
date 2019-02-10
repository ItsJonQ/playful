# ▶️ Playful

> A simple transition library for React (and routers!)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install --save playful
```

## Usage

```jsx
import {withTransition} from 'playful'

// Create your components as you normally would
const MyComponent = () => <div>My Content</div>

// Define the effect you'd like your component to animate with when it is
// mounted and unmounted. Technically, you don't need to do this.
// The library has some nice smart defaults.
const playOptions = {
  effect: 'fadeAndPop',
  duration: 600,
  direction: 'up',
}

// Create the enhanced component using withTransition along with your
// options and component.
const PlayfulComponent = withTransition(playOptions)(MyComponent)

// Render it out! ✨
const App = () => {
  return (
    <div className="App">
      <PlayfulComponent />
    </div>
  )
}
```
