import React, { PureComponent } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const prepareData = data =>
  data
    .toJS()
    .sort((e1, e2) => (e1.date - e2.date))
    .map(entry => {
      let date = new Date(entry.date)

      date = '' + date.getDate() + '/' + ('0' + (date.getMonth() + 1)).slice(-2)

      return { date: date, weight: +entry.weight }
    })

const getExtremalWeights = (data) => {
  if (data.length < 2) return [50, 150]
  let weights = data.toJS().map(d => +d.weight).sort((w1, w2) => w1 - w2)
  let min = weights[0]
  let max = weights[weights.length - 1]
  let diff = max - min
  max += diff / 5
  min -= diff / 5
  min = Number((min).toFixed(1)) // to avoid 93.99999999 displayed on chart
  max = Number((max).toFixed(1))

  return [min, max]
}

class ProgressChart extends PureComponent {
  render () {
    const { data } = this.props

    let extremalWeights = getExtremalWeights(data)

    return (
      <LineChart width={600} height={300} data={prepareData(data)}
        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
        <XAxis dataKey='date' />
        <YAxis type='number' domain={extremalWeights} />
        <CartesianGrid strokeDasharray='5 30' />
        <Tooltip />
        <Legend />
        <Line type='natural' dataKey='weight' stroke='#8884d8' />
      </LineChart>
    )
  }
}

export default ProgressChart
