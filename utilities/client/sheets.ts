export type SheetData = string[][];

export const getItemByHeaderName = (
  headerName: string,
  headersRow: string[],
  row: string[]
) => {
  if (!headersRow) throw new Error("Sheet is undefined");
  if (!row) throw new Error("Row is undefined");
  if (row.length !== headersRow.length)
    throw new Error("Row and header row are not the same length");
  const headerIndex = headersRow.indexOf(headerName);
  return row[headerIndex];
};

const toCamelCase = (s: string) => {
  // make the first character lowercase
  s = s.charAt(0).toLowerCase() + s.slice(1);
  return s.replace(/[-_\s](.)/g, (_, c) => c.toUpperCase());
};

export const convertRowToNamedObject = (
  headersRow: string[],
  row: string[]
) => {
  const namedObject: { [key: string]: string } = {};
  headersRow.forEach((header, index) => {
    namedObject[toCamelCase(header)] = row[index];
  });
  return namedObject;
};
