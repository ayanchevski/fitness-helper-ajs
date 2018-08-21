import React from 'react'
import { Table, EditCell, DeleterCell } from 'components/common'

const columns = [
  { id: 'date', Header: 'Date', accessor: d => new Date(d.date).toLocaleDateString() },
  { Header: 'Weight', accessor: 'weight' },
  { Header: 'Edit', accessor: 'edit', Cell: <EditCell /> },
  { Header: 'Remove', accessor: 'remove', Cell: <DeleterCell /> }
]

const ProgressTable = ({ data, openModal, removeProgressRecord }) => (
  <Table
    name='Weight records'
    data={data}
    columns={columns}
    onEditCellClick={id => {
      openModal({ id, type: 'progress' })
    }}
    onDeleterCellClick={id => {
      removeProgressRecord(id)
    }}
  />
)

export default ProgressTable
