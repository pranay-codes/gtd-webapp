// src/components/NextActionItemsTable.js
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import { useSelector } from 'react-redux';

const NextActionItemsTable = () => {
  const { items } = useSelector(state => state.nextActionItems);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedItems = items.slice().sort((a, b) => {
    if (orderBy === 'dueDate') {
      return order === 'asc'
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate);
    }
    return order === 'asc'
      ? a[orderBy].localeCompare(b[orderBy])
      : b[orderBy].localeCompare(a[orderBy]);
  });

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {['Title', 'Due Date', 'Context', 'Details'].map(
                (headCell, index) => (
                  <TableCell key={index}>
                    <TableSortLabel
                      active={
                        orderBy === headCell.toLowerCase().replace(' ', '')
                      }
                      direction={
                        orderBy === headCell.toLowerCase().replace(' ', '')
                          ? order
                          : 'asc'
                      }
                      onClick={event =>
                        handleRequestSort(
                          event,
                          headCell.toLowerCase().replace(' ', '')
                        )
                      }
                    >
                      {headCell}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(item => (
                <TableRow hover key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.dueDate}</TableCell>
                  <TableCell>{item.context}</TableCell>
                  <TableCell>{item.details}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default NextActionItemsTable;
