import styles from "./Table.module.css";

function Table({ columns, data, actions }) {
  return (
    <>
      <table>
        <thead className={styles.tableHeader}>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.header}</th>
            ))}
            {actions && <th></th>}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.length ? (
            data.map((row) => (
              <tr key={row._id}>
                {columns.map((col, i) => (
                  <td key={i}>{col.render(row)}</td>
                ))}
                {actions && <td>{actions(row)}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className={styles.noData}>
                {" "}
                No hay datos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
