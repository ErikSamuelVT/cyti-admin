import { TableLog } from './interfaces';

export const exportJSON = (data: TableLog[]): void => {
  if (typeof window === 'undefined') return;
  const jsonString = JSON.stringify(data, null, 2);

  const blob = new Blob([jsonString], { type: 'application/json' });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.json';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
export const readJSONFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Error al leer el archivo'));

    reader.readAsText(file);
  });
};
