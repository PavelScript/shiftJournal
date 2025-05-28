import {React, useEffect, useState, useMemo, Fragment} from "react";
import styles from "./TableZayavki.module.scss";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';


const TableZayavki = () => {
  const [expanded, setExpanded] = useState({});
  const [dataReady, setData] = useState([]);

  //Получаем заявки из БД
    useEffect(() => {
    fetch('http://46.173.29.202:5000/api/zayavki')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  const columns = useMemo(
    () => [
      {
        id: 'expander',
        header: '',
        cell: ({ row}) => (
           <div>
              {row.getCanExpand() ? (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    className: styles.expander
                  }}
                >
                  {row.getIsExpanded() ? '-' : '+'}
                </button>
              ) : (
                ''
              )}{' '}

            </div>
        ),
        size: 35,
      },
      {
        accessorKey: "id",
        header: "№ п/п",
        size: 35,
      },
      {
        accessorKey: "place",
        header: "Объект",
        size: 110,
      },
      {
        accessorKey: "via",
        header: "Способ подачи заявки",
        size: 120,
      },
      {
        accessorKey: "timeOpened",
        header: "Дата и время принятия заявки",
        size: 150,
      },
      {
        accessorKey: "whoOpened",
        header: "ФИО/должность подавшего заявку",
        size: 150,
      },
      {
        accessorKey: "whoGot",
        header: "ФИО/должность принявшего заявку",
        size: 180,
      },
      {
        accessorKey: "description",
        header: "Описание заявки/инцидента",
        size: 250,
      },
      {
        accessorKey: "solution",
        header: "Решение заявки инцидента",
        size: 350,
      },
      {
        accessorKey: "timeClosed",
        header: "Дата и время решения заявки",
        cell: (info) => {
          const value = info.getValue();
          return (
            <div className={styles.timeClosed}>
              <div className={styles.valueTimeClosed}>{value}</div>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle
                  className={value ? styles.greenCircle : ''}
                  cx="10"
                  cy="10"
                  r="8"
                />
              </svg>
            </div>
          );
        },
        size: 200,
      },
    ],
    []
  );

    
  const table = useReactTable({
    data: dataReady,
    columns,
  state: {
    expanded,
  },
  onExpandedChange: setExpanded,
   getSubRows: row => row.subRows ?? [],
  getCoreRowModel: getCoreRowModel(),
  enableExpanding: true,
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
                    width: header.getSize(),
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
    <Fragment key={row.id}>
      <tr>
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            style={{
              width: cell.column.getSize(),
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>

      {/* Дочерние строки */}
      {row.getIsExpanded() &&
        row.subRows?.map(subRow => (
          <tr key={subRow.id} className={styles.subRow}>
            {subRow.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                style={{

                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      }
    </Fragment>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default TableZayavki;