import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ExercisesTable } from 'components/exercises'
import { AddExerciseForm } from 'components/forms'
import { addExercise, fetchExercises, removeExercise } from 'actions/exercises'
import './ExercisesContainer.css'

class ExercisesContainer extends PureComponent {
  componentDidMount () {
    const { fetchExercises } = this.props

    fetchExercises()
  }

  onAddExerciseFormSubmit = ({ name, caloriesPerHour }) => {
    const { addExercise } = this.props

    addExercise({ name, caloriesPerHour: +caloriesPerHour })
  }

  render() {
    const { myExercises, allExercises, isAuthenticated, removeExercise, openModal } = this.props

    return (
      <div className='ExercisesContainer'>
        {isAuthenticated ? <ExercisesTable name='My exercises' data={myExercises} removeExercise={removeExercise} openModal={openModal}/> : null }
        <ExercisesTable name='All exercises' data={allExercises} />
        {isAuthenticated ? <AddExerciseForm onSubmit={this.onAddExerciseFormSubmit} /> : null }
      </div>
    )
  }
}

export default connect(
  state => ({
    isAuthenticated: state.account.get('isAuthenticated'),
    myExercises: state.exercises.get('myExercises'),
    allExercises: state.exercises.get('allExercises')
  }),
  {
    addExercise,
    fetchExercises,
    removeExercise
  }
)(ExercisesContainer)
