import { useState } from 'react'

const Header = (props) => {
  return(
  <h1>{props.header}</h1>
  )
}

const StatisticsLine = props => {
    return (
      <p>{props.text} {props.value}</p>
    )

}

const Statistics = (props) => {
  const all = (props.good + props.bad + props.neutral)
  const positive = ((props.good/all)*100)+" %"
  if (all===0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticsLine text="good" value = {props.good}/>
      <StatisticsLine text="neutral" value = {props.neutral}/>
      <StatisticsLine text="bad" value = {props.bad}/>
      <StatisticsLine text="all" value = {all}/>
      <StatisticsLine text="average" value = {(props.good -props.bad)/all}/>
      <StatisticsLine text="positive" value = {positive}/>
      </div>
  )
}

const Button = (props) => {
  const increaseByOne = () => props.setCounter(props.counter + 1)
  return (
  <button onClick={increaseByOne}>
    {props.text}
  </button>
  )
}



const App = () => {
  const header1 = "give feedback"
  const header2 = "statistics"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header = {header1}/>
      <Button counter = {good} setCounter = {setGood} text = "good"/>
      <Button counter = {neutral} setCounter = {setNeutral} text = "neutral"/>
      <Button counter = {bad} setCounter = {setBad} text = "bad"/>
      <Header header = {header2}/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App