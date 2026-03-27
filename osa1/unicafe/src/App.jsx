import { useState } from 'react'

const Header = (props) => {
  return(
  <h1>{props.header}</h1>
  )
}

const Statistics = (props) => {
  if (props.good + props.bad + props.neutral===0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <p>good {props.good}</p>
      <p> neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.good + props.bad + props.neutral}</p>
      <p>average {(props.good -props.bad) / (props.good + props.bad + props.neutral)}</p>
      <p>positive {(props.good/(props.good + props.bad + props.neutral))*100} %</p>
      </div>
  )
}




const App = () => {
  // tallenna napit omaan tilaansa
  const increaseByOneG = () => setGood(good + 1)
  const increaseByOneN = () => setNeutral(neutral + 1)
  const increaseByOneB = () => setBad(bad + 1)
  const header1 = "give feedback"
  const header2 = "statistics"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header = {header1}/>
      <button onClick={increaseByOneG}>
        good
      </button>
      <button onClick={increaseByOneN}>
        neutral
      </button>
      <button onClick={increaseByOneB}>
        bad
      </button>
      <Header header = {header2}/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App