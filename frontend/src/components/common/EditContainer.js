import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { AddExerciseForm, AddFoodForm, AddProgressRecordForm } from 'components/forms'
import { editExercise } from 'actions/exercises' 
import { editProgressRecord } from 'actions/progress'
import { editFood } from 'actions/foods'
import { getDate } from 'utils/forms'

class EditContainer extends PureComponent {
  onEditExerciseFormSubmit = ({ name, caloriesPerHour }) => {
    const { id, editExercise, closeModal } = this.props

    editExercise({ id, name, caloriesPerHour })
    closeModal()
  }

  onEditProgressRecordFormSubmit = ({ date, weight }) => {
    const { id, editProgressRecord, closeModal } = this.props
  
    editProgressRecord({ id, date, weight })
    closeModal()
  }

  onEditFoodFormSubmit = ({ name, carbs, fats, protein }) => {
    const { id, editFood, closeModal } = this.props

    editFood({ id, name, carbs, fats, protein })
    closeModal()
  }

  renderEditExerciseForm = () => {
    const { id, allExercises } = this.props
    const { name, caloriesPerHour } = allExercises.find(item => item.get('id') === id).toJS()

    return (
      <AddExerciseForm
        title='Edit exercise'
        submitButtonText='Edit'
        onSubmit={this.onEditExerciseFormSubmit}
        initialValues={{ name, caloriesPerHour }}
      />
    )
  }

  renderEditFoodForm = () => {
    const { id, allFoods } = this.props
    const { name, fats, carbs, protein } = allFoods.find(item => item.get('id') === id).toJS()

    return (
      <AddFoodForm
        title='Edit food'
        submitButtonText='Edit'
        onSubmit={this.onEditFoodFormSubmit}
        initialValues={{ name, fats, carbs, protein }}
      />
    )
  }

  renderEditProgressRecordForm = () => {
    const { id, progressRecords } = this.props
    const { date, weight } = progressRecords.find(item => item.get('id') === id).toJS()

    return (
      <AddProgressRecordForm
        title='Edit weight'
        submitButtonText='Edit'
        onSubmit={this.onEditProgressRecordFormSubmit}
        initialValues={{ date: getDate(date), weight }}
      />
    )
  }

  renderContent = () => {
    const { id, type } = this.props

    switch (type) {
      case 'exercise':
        return this.renderEditExerciseForm()
      case 'food':
        return this.renderEditFoodForm()
      case 'progress':
        return this.renderEditProgressRecordForm()
    }
  }

  render() {
    return (
      <div className='EditContainer'>
        {this.renderContent()}
      </div>
    )
  }
}

export default connect(
  state => ({
    allExercises: state.exercises.get('allExercises'),
    allFoods: state.foods.get('allFoods'),
    progressRecords: state.progress.get('progress')
  }),
  {
    editExercise,
    editFood,
    editProgressRecord
  }
)(EditContainer)
