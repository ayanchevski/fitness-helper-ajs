import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class DiaryPage extends PureComponent {
  render() {
    return (
      <div>Diary page</div>
    )
  }
}

export default connect(
  state => ({
  }),
  {
  }
)(DiaryPage)
