import { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, natural, bad, all }) => {
  let average = (good - bad) / all
  let positive = `${(good / all) * 100}%`
  return (
    <div>
      <h1>statistics</h1>
      {all === 0 ? (
        <div>No Feedback Given</div>
      ) : (
        <table>
          <tbody>
            <StatisticLine text={'good'} value={good} />
            <StatisticLine text={'natural'} value={natural} />
            <StatisticLine text={'bad'} value={bad} />
            <StatisticLine text={'all'} value={all} />
            <StatisticLine text={'average'} value={average} />
            <StatisticLine text={'positive'} value={positive} />
          </tbody>
        </table>
      )}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [natural, setNatural] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNatural = () => {
    setNatural(natural + 1)
    setAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button text={'good'} handleClick={handleGood} />
        <Button text={'natural'} handleClick={handleNatural} />
        <Button text={'bad'} handleClick={handleBad} />
      </div>
      <Statistics good={good} natural={natural} bad={bad} all={all} />
    </>
  )
}

export default App
