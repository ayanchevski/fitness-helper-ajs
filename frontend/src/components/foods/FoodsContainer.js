import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { FoodsTable } from 'components/foods'
import { AddFoodForm } from 'components/forms'
import { addFood, removeFood, fetchFoods} from 'actions/foods'
import './FoodsContainer.css'

class FoodsContainer extends PureComponent {
  componentDidMount () {
    const { fetchFoods } = this.props

    fetchFoods()
  }

  onAddFoodFormSubmit = ({ name, carbs, protein, fats }) => {
    const { addFood} = this.props

    addFood({ name, carbs, protein, fats })
  }

  render() {
    const { myFoods, allFoods, isAuthenticated, removeFood, openModal } = this.props

    return (
      <div className='FoodsContainer'>
        {isAuthenticated ? <FoodsTable name='My foods' data={myFoods} removeOption={true} removeFood={removeFood} openModal={openModal} /> : null }
        <FoodsTable name='All foods' data={allFoods} />
        { isAuthenticated ? <AddFoodForm onSubmit={this.onAddFoodFormSubmit} /> : null }
      </div>
    )
  }
}

export default connect(
  state => ({
    myFoods: state.foods.get('myFoods'),
    allFoods: state.foods.get('allFoods'),
    isAuthenticated: state.account.get('isAuthenticated')
  }),
  {
    addFood,
    removeFood,
    fetchFoods
  }
)(FoodsContainer)
