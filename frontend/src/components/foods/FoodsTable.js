import React from 'react'
import { Table, EditCell, DeleterCell } from 'components/common'
import './FoodsTable.css'

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Calories', accessor: 'calories' },
  { Header: 'Protein', accessor: 'protein' },
  { Header: 'Carbs', accessor: 'carbs' },
  { Header: 'Fats', accessor: 'fats' },
]
const editColumn = { Header: 'Edit', accessor: 'edit', Cell: <EditCell /> }
const removeColumn = { Header: 'Remove', accessor: 'remove', Cell: <DeleterCell /> }

const FoodsTable = ({ name, data, openModal, removeFood }) => {
  return (
    <Table
      name={name}
      data={data}
      columns={removeFood ? [...columns, editColumn, removeColumn] : columns}
      onEditCellClick={id => {
        openModal({ id, type: 'food' })
      }}
      onDeleterCellClick={id => {
        removeFood(id)
      }}
    />
  )
}

export default FoodsTable
