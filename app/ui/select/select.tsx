import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { SelectElementProps } from '@/app/lib/interfaces';

export default function SelectElement({
  id,
  name,
  label,
  value,
  onChange,
  elements,
}: SelectElementProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select labelId={id} name={name} value={value} label={label} onChange={onChange} required>
        {elements.map((element) => (
          <MenuItem value={element}>{element}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
