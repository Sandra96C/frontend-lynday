import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import styles from "./Users.module.css";
import { Pencil, Trash, UserPlus, CircleCheck, CircleX, X } from "lucide-react";
import UserForm from "./forms/UserForm";
import FloatingButton from "../../shared/FloatingButton";
import Table from "../../shared/Table";
import ConfirmModal from "../../shared/ConfirmModal";
import { deleteUser } from "../../services/user.service";

function Users() {
  const { users, loadUsers } = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [creatingUser, setCreatingUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const columns = [
    { header: "Nombre", render: (user) => user.name },
    { header: "Email", render: (user) => user.email },
    { header: "Rol", render: (user) => user.role },
    {
      header: "Activo",
      render: (user) =>
        user.active ? (
          <CircleCheck className={`${styles.icon} success`} />
        ) : (
          <CircleX className={`${styles.icon} red`} />
        ),
    },
  ];
  const actions = (user) => {
    return (
      <div className={styles.actions}>
        <Pencil className={`${styles.icon}`} onClick={() => selectUser(user)} />
        <Trash
          className={`${styles.icon} red`}
          onClick={() => setUserToDelete(user._id)}
        />
      </div>
    );
  };

  const selectUser = (user) => {
    setCreatingUser(false);
    setSelectedUser(user);
    console.log("Selected user:", user);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      console.log("Delete user with ID:", userToDelete);
      await deleteUser(userToDelete);
      loadUsers();
    } catch (error) {
      console.error("Error al borrar usuario:", error);
    } finally {
      setUserToDelete(null);
    }
  };

  const handleCreateClick = () => {
    setSelectedUser(null);
    setCreatingUser(true);
  };

  const handleFormSuccess = () => {
    loadUsers();
    setSelectedUser(null);
    setCreatingUser(false);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.userPanel}>
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <p>
          Panel unicamente para administradores, destinado a la gestión de
          usuarios
        </p>

        <section className={styles.table}>
          <Table columns={columns} data={users} actions={actions}></Table>
        </section>
      </div>
      {selectedUser || creatingUser ? (
        <div className={styles.formDiv}>
          <span className={styles.close}>
            <X
              className={`${styles.icon} close`}
              onClick={() => {
                setSelectedUser(null);
                setCreatingUser(false);
              }}
            />
          </span>
          <UserForm user={selectedUser} onSuccess={handleFormSuccess} />
        </div>
      ) : (
        ""
      )}
      <FloatingButton
        icon={UserPlus}
        onClick={handleCreateClick}
        title="Crear Usuario"
      />
      <ConfirmModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar usuario?"
        message="¿Estás seguro de que deseas eliminar este usuario?"
      />
    </div>
  );
}

export default Users;
