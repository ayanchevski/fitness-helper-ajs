import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import './Table.css'

const Table = ({ name, columns, data, defaultPageSize = 5, minRows = 1, onItemClick, onEditCellClick, onDeleterCellClick }) => (
  <div className='Table'>
    <span className='name'>{name}</span>
    {
      data.size
        ? <ReactTable
          data={data.toJS()}
          columns={columns}
          defaultPageSize={defaultPageSize}
          minRows={minRows}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                if (onItemClick) {
                  onItemClick(rowInfo)
                }
                if (onEditCellClick && column.id === 'edit') {
                  onEditCellClick(rowInfo.original.id)
                }
                if (onDeleterCellClick && column.id === 'remove') {
                  onDeleterCellClick(rowInfo.original.id)
                }
                if (handleOriginal) {
                  handleOriginal()
                }
              }
            }
          }}
        />
        : <span className='empty'>No results</span>
    }
  </div>
)

export default Table
