'use client';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Fragment, useMemo, useState } from 'react';

import { OperatorTrip, TableLog, UnitTrip } from '@/app/lib/interfaces';
import { exportJSON, readJSONFile } from '@/app/lib/jsonUtils';
import { getTripsByOperators, getTripsByUnits } from '@/app/lib/tripUtils';
import { useLogStore } from '@/app/store/logStore';

import Title from '../title/title';

interface props {
  title: string;
  headers: string[];
  tableType: 'log' | 'operators' | 'units';
  setRecordToUpdate?: React.Dispatch<React.SetStateAction<TableLog | null>>;
}

export default function TableComponent({ title, headers, tableType, setRecordToUpdate }: props) {
  const rowsPerPage = 5;
  const [page, setPage] = useState(0);

  const { records, deleteRedcord, setRecords } = useLogStore();

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const tripsByUnit = useMemo(() => getTripsByUnits(records), [records]);

  const tripsByOperator = useMemo(() => getTripsByOperators(records), [records]);

  const data =
    tableType === 'log' ? records : tableType === 'operators' ? tripsByOperator : tripsByUnit;

  const paginatedRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const rowsLog = (log: TableLog) => {
    return (
      <Fragment key={log.id}>
        <TableCell align="center">{log.date}</TableCell>
        <TableCell align="center">{log.operator}</TableCell>
        <TableCell align="center">{log.unit}</TableCell>
        {log.nDestinations !== undefined && log.nDestinations > 0 ? (
          <TableCell align="center">
            {log.destinity} ({log.nDestinations})
          </TableCell>
        ) : (
          <TableCell align="center">{log.destinity}</TableCell>
        )}

        <TableCell align="center">
          <Box className="flex gap-1 justify-center">
            <Button
              onClick={() => setRecordToUpdate?.(log)}
              variant="contained"
              size="small"
              color="primary"
            >
              Actualizar
            </Button>
            <Button
              onClick={() => deleteRedcord(log.id)}
              variant="contained"
              size="small"
              color="error"
            >
              Borrar
            </Button>
          </Box>
        </TableCell>
      </Fragment>
    );
  };

  const rowsOperators = (operator: OperatorTrip) => {
    return (
      <Fragment key={operator.operator}>
        <TableCell align="center">{operator.operator}</TableCell>
        <TableCell align="center">{operator.trips}</TableCell>
      </Fragment>
    );
  };

  const rowsUnits = (unit: UnitTrip) => {
    return (
      <Fragment key={unit.unit}>
        <TableCell align="center">{unit.unit}</TableCell>
        <TableCell align="center">{unit.trips}</TableCell>
      </Fragment>
    );
  };

  const renderUI = (item: TableLog | OperatorTrip | UnitTrip) => {
    switch (tableType) {
      case 'log':
        const log = item as TableLog;
        return rowsLog(log);
      case 'operators':
        const operator = item as OperatorTrip;
        return rowsOperators(operator);
      case 'units':
        const unit = item as UnitTrip;
        return rowsUnits(unit);
      default:
        break;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const content = await readJSONFile(file);
      const contentParsed = JSON.parse(content);
      setRecords(contentParsed);
      alert('Datos importados correctamente.');
    } catch (error) {
      alert('Error al procesar el archivo.');
    }
  };

  return (
    <>
      {tableType === 'log' && (
        <Box className="flex justify-between">
          <Title title={title} />
          <Box className="flex gap-2">
            <Button
              onClick={() => exportJSON(records)}
              variant="outlined"
              size="small"
              color="primary"
            >
              Exportar
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="warning"
              role={undefined}
              tabIndex={-1}
              component="label"
            >
              Importar
              <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
            </Button>
          </Box>
        </Box>
      )}
      {records.length === 0 && (
        <Box className="flex justify-center items-center rounded-lg shadow-lg min-h-[300]">
          <Typography variant="body1" className="mt-10 text-gray-500">
            No hay registros disponibles
          </Typography>
        </Box>
      )}

      <TableContainer
        component={Paper}
        className={`${records.length === 0 && 'hidden'} mt-5 max-h-[430]`}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} align="center" className="text-2xl">
                  {header}
                </TableCell>
              ))}
              {tableType === 'log' && <TableCell align="center">Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((item, index) => {
              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {renderUI(item)}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                count={records.length}
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
