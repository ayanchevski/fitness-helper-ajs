import React from 'react'
import { pencil } from 'react-icons-kit/fa/pencil'
import SvgIcon from 'react-icons-kit'

const DeleterCell = () => (
  <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
    <SvgIcon size={15} icon={pencil} />
  </div>
)

export default DeleterCell
