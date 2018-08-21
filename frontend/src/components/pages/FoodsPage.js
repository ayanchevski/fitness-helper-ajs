import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PageHeading } from 'components/common'
import { FoodsContainer } from 'components/foods'
import './FoodsPage.css'

class FoodsPage extends PureComponent {
  render() {
    const { openModal } = this.props

    return (
      <div className='FoodsPage'>
        <PageHeading text='Foods' />
        <FoodsContainer openModal={openModal} />
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  {
  }
)(FoodsPage)
