import React from 'react'
import { remove } from 'react-icons-kit/fa/remove'
import SvgIcon from 'react-icons-kit'

const DeleterCell = () => (
  <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
    <SvgIcon size={15} icon={remove} />
  </div>
)

export default DeleterCell
