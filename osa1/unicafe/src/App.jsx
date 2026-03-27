import { useState } from 'react'

const Header = (props) => {
  return(
  <h1>{props.header}</h1>
  )
}

const increaseByOne = (props) => {
  setCounter(props.counter + 1)
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
      <p>good {good}</p>
      <p> neutral {neutral}</p>
      <p>bad {bad}</p>

      
    </div>
  )
}

export default App