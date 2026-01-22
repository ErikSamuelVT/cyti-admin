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
} from '@mui/material';
import { Fragment, useEffect, useMemo, useState } from 'react';

import { getTripsByOperators, getTripsByUnits } from '@/app/lib/getNTrips';
import { OperatorTrip, TableLog, UnitTrip } from '@/app/lib/interfaces';
import { useLogStore } from '@/app/store/logStore';

interface props {
  title: string; //titulo para la tabla
  headers: string[]; //Encabezados de la tabla
  tableType: 'log' | 'operators' | 'units'; //Tipos de datos a mostrar en la tabla
  setRecordToUpdate?: React.Dispatch<React.SetStateAction<TableLog | null>>; //Estado para indicar que la infirmación se va a editar
}

export default function TableComponent({ title, headers, tableType, setRecordToUpdate }: props) {
  //Constantes para la paginación
  const rowsPerPage = 5;
  const [page, setPage] = useState(0);

  //Storage con la función para eliminar registros
  const { records, deleteRedcord } = useLogStore();

  //Función para detectar los cambios en los input
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  //Guardamos en cache la obtención de los viajes por unidad
  const tripsByUnit = useMemo(() => getTripsByUnits(records), [records]);

  //Guardamos en cache la obtención de los viajes por operador
  const tripsByOperator = useMemo(() => getTripsByOperators(records), [records]);

  //Obtenemos los datos dependiendo el tipo de dato que solicita el componente
  const data =
    tableType === 'log' ? records : tableType === 'operators' ? tripsByOperator : tripsByUnit;

  //Calculamos la paginación dependiento el tamaño del arreglo de datos
  const paginatedRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  //Retorno del jsx si es 'log'
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

  //Retorno del jsx si es 'operators'
  const rowsOperators = (operator: OperatorTrip) => {
    return (
      <Fragment key={operator.operator}>
        <TableCell align="center">{operator.operator}</TableCell>
        <TableCell align="center">{operator.trips}</TableCell>
      </Fragment>
    );
  };

  //Retorno del jsx si es 'units'
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

  return (
    <>
      <h3 className="text-2xl font-semibold">{title}</h3>
      {records.length === 0 && (
        <div className="flex justify-center items-center rounded-lg shadow-lg min-h-[300]">
          <p className="mt-10 text-gray-500">No hay registros disponibles</p>
        </div>
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
