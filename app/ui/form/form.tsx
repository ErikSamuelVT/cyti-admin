import { Button, SelectChangeEvent, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, useState } from 'react';

import { destinations, operators, units } from '@/app/lib/constants';
import { TableLog } from '@/app/lib/interfaces';
import { propsState } from '@/app/lib/types';
import { useLogStore } from '@/app/store/logStore';

import SelectElement from '../select/select';

export default function Form() {
  const [data, setData] = useState<propsState>({
    date: '',
    operator: '',
    unit: '',
    destinity: '',
    nDestinations: 0,
  });

  const { addRecord } = useLogStore();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChageDatePicker = (value: Dayjs | null) => {
    setData((prev) => ({
      ...prev,
      date: value?.format('YYYY/MM/DD') || '',
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.date === '') {
      alert('La fecha es obligatoria');
      return;
    }

    const newRecord: TableLog = {
      ...data,
      id: crypto.randomUUID(),
    };

    addRecord(newRecord);

    setData({
      date: '',
      operator: '',
      unit: '',
      destinity: '',
      nDestinations: 0,
    });
  };

  return (
    <>
      <h3 className="text-2xl font-semibold">Formulario de registro</h3>
      <form className="flex flex-col gap-4 mt-2 max-h-[430]" onSubmit={handleSubmit}>
        <DatePicker
          name="date"
          label="Fecha"
          value={data.date ? dayjs(data.date, 'YYYY/MM/DD') : null}
          onChange={handleChageDatePicker}
        />

        <SelectElement
          id="operator"
          name="operator"
          label="Operador"
          value={data.operator}
          onChange={handleChange}
          elements={operators}
        />
        <SelectElement
          id="unit"
          name="unit"
          label="Unidad"
          value={data.unit}
          onChange={handleChange}
          elements={units}
        />
        <SelectElement
          id="destinity"
          name="destinity"
          label="Destino"
          value={data.destinity}
          onChange={handleChange}
          elements={destinations}
        />
        {data.destinity === 'Puebla refrigerado' && (
          <TextField
            label="Número de tiros"
            name="nDestinations"
            type="text"
            variant="standard"
            value={data.nDestinations}
            onChange={handleChange}
            required
          />
        )}
        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </form>
    </>
  );
}
