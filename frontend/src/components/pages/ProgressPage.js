import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PageHeading } from 'components/common'
import { ProgressContainer } from 'components/progress'
import './ProgressPage.css'

class ProgressPage extends PureComponent {
  render() {
    const { openModal } = this.props

    return (
      <div className='ProgressPage'>
        <PageHeading text='Progress' />
        <ProgressContainer openModal={openModal} />
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  {
  }
)(ProgressPage)
