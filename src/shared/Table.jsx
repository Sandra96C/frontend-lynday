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
        {/* <thead className={styles.tableHeader}>
          <tr>
            {columns.map((col) => {
              <th> {col}</th>;
            })}
            {actions ?? <th></th>}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.map((dat) => (
            <tr key={dat._id}>
              <td className="fw-bold">
                {dat.name.charAt(0).toUpperCase() + dat.name.slice(1)}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.active ? (
                  <CircleCheck className={`${styles.icon} success`} />
                ) : (
                  <CircleX className={`${styles.icon} red`} />
                )}
              </td>
              {actions ?? (
                <td>
                  <div className={styles.actions}>
                    <Pencil
                      className={styles.icon}
                      onClick={() => {
                        selectUser(user);
                      }}
                    />
                    <Trash
                      className={`${styles.icon} red`}
                      onClick={() => setUserToDelete(user._id)}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody> */}
      </table>
    </>
  );
}

export default Table;
