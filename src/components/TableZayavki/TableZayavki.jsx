import React from "react";
import styles from "./TableZayavki.module.scss";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import data from "./data";

const TableZayavki = () => {
  const dataReady = React.useMemo(() => data, []);
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "№ п/п",
        size: 40,
      },
      {
        accessorKey: "place",
        header: "Объект",
        size: 130,
      },
      {
        accessorKey: "timeOpened",
        header: "Дата и время принятия заявки",
        size: 150,
      },
      {
        accessorKey: "whoOpened",
        header: "ФИО/должность подавшего заявку",
        size: 180,
      },
      {
        accessorKey: "whoGot",
        header: "ФИО/должность принявшего заявку",
        size: 180,
      },
      {
        accessorKey: "description",
        header: "Описание заявки/инцидента",
        size: 300,
      },
      {
        accessorKey: "solution",
        header: "Решение заявки инцидента",
        size: 300,
      },
      {
        accessorKey: "timeClosed",
        header: "Дата и время решения заявки",
        size: 200,
      },
    ],
    []
  );

  const table = useReactTable({
    data: dataReady,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    textAlign: "center",
                    width: header.getSize(), // только ширина
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    textAlign: "center",
                    width: cell.column.getSize(), // только ширина
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableZayavki;
