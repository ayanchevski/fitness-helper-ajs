import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PageHeading } from 'components/common'
import { ExercisesContainer } from 'components/exercises'
import './ExercisesPage.css'

class ExercisesPage extends PureComponent {
  render() {
    const { openModal } = this.props

    return (
      <div className='ExercisesPage'>
        <PageHeading text='Exercises' />
        <ExercisesContainer openModal={openModal} />
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  {
  }
)(ExercisesPage)
