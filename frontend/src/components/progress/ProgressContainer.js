import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ProgressTable, ProgressChart } from 'components/progress'
import { AddProgressRecordForm } from 'components/forms'
import { addProgressRecord, fetchProgress, removeProgressRecord } from 'actions/progress'
import './ProgressContainer.css'

class ProgressContainer extends PureComponent {
  componentDidMount() {
    const { fetchProgress } = this.props

    fetchProgress()
  }

  onAddProgressRecordFormSubmit = ({ date, weight }) => {
    const { addProgressRecord } = this.props

    addProgressRecord({ date: +new Date(date), weight })
  }

  render() {
    const { progress, editProgressRecord, removeProgressRecord, openModal } = this.props

    return (
      <div className='ProgressContainer'>
        { progress && progress.size ? <ProgressChart data={progress} /> : null }
        <ProgressTable
          data={progress}
          removeProgressRecord={removeProgressRecord}
          openModal={openModal}
        />
        <AddProgressRecordForm onSubmit={this.onAddProgressRecordFormSubmit} />
      </div>
    )
  }
}

export default connect(
  state => ({
    progress: state.progress.get('progress')
  }),
  {
    addProgressRecord,
    fetchProgress,
    removeProgressRecord
  }
)(ProgressContainer)
