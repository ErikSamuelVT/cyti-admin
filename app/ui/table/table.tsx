'use client';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useState } from 'react';

import { TableLog, TableOperators, TableUnits } from '@/app/lib/interfaces';
import { isTableLogArray, isTableOperatorsArray, isTableUnitsArray } from '@/app/lib/typeGuards';

interface Table {
  headers: string[];
  rowsData: TableLog[] | TableOperators[] | TableUnits[];
}

interface TableProps {
  title: string;
  structureTable: Table;
}

export default function TableComponent({ title, structureTable }: TableProps) {
  const rowsPerPage = 5;
  const [page, setPage] = useState(0);

  let tableLogRows: TableLog[] = [];
  let tableOperatorRows: TableOperators[] = [];
  let tableUnitsRows: TableUnits[] = [];

  const { headers, rowsData } = structureTable;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const data = () => {
    if (isTableLogArray(rowsData)) {
      tableLogRows = rowsData;
    } else if (isTableOperatorsArray(rowsData)) {
      tableOperatorRows = rowsData;
    } else if (isTableUnitsArray(rowsData)) {
      tableUnitsRows = rowsData;
    }
  };

  data();

  return (
    <>
      <h3 className="text-2xl font-semibold">{title}</h3>
      {rowsData.length === 0 && (
        <div className="flex justify-center items-center rounded-lg shadow-lg min-h-[300]">
          <p className="mt-10 text-gray-500">No hay registros disponibles</p>
        </div>
      )}

      <TableContainer
        component={Paper}
        className={`${rowsData.length === 0 && 'hidden'} mt-5 max-h-[430]`}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} align="center" className="text-2xl">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableLogRows.length > 0 &&
              tableLogRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{item.date}</TableCell>
                    <TableCell align="center">{item.operator}</TableCell>
                    <TableCell align="center">{item.unit}</TableCell>
                    {item.nDestinations !== undefined && item.nDestinations > 0 ? (
                      <TableCell align="center">
                        {item.destinity} ({item.nDestinations})
                      </TableCell>
                    ) : (
                      <TableCell align="center">{item.destinity}</TableCell>
                    )}
                  </TableRow>
                ))}

            {tableOperatorRows.length > 0 &&
              tableOperatorRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{item.operator}</TableCell>
                    <TableCell align="center">{item.nTrips}</TableCell>
                  </TableRow>
                ))}

            {tableUnitsRows.length > 0 &&
              tableUnitsRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{item.unit}</TableCell>
                    <TableCell align="center">{item.nTripsUnit}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                count={structureTable.rowsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
