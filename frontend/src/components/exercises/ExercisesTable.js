import React from 'react'
import { Table, EditCell, DeleterCell } from 'components/common'

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Calories burned', accessor: 'caloriesPerHour' }
]
const editColumn = { Header: 'Edit', accessor: 'edit', Cell: <EditCell /> }
const removeColumn = { Header: 'Remove', accessor: 'remove', Cell: <DeleterCell /> }

const ExercisesTable = ({ name, data, removeExercise, openModal }) => (
  <Table
    name={name}
    data={data}
    columns={removeExercise ? [...columns, editColumn, removeColumn] : columns}
    onEditCellClick={id => {
      openModal({ id, type: 'exercise' })
    }}
    onDeleterCellClick={id => {
      removeExercise(id)
    }}
  />
)

export default ExercisesTable
