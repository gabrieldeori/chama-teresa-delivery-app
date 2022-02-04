import React, { useEffect, useState } from 'react';

import { Navbar, ListItem, RegisterUserForm } from '../components';

import { getUsers, deleteUser } from '../services';
import { navPages } from '../utils';

const AdminManage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => getUsers(setUsers), []);

  return (
    <>
      <header>
        <Navbar navPages={ navPages['/admin'] } />
      </header>
      <main>
        <section>
          <h3>Cadastrar novo usuário</h3>
          <RegisterUserForm />
        </section>
        <section>
          <h3>Lista de usuários</h3>
          <div>
            <span>Item</span>
            <span>Nome</span>
            <span>E-mail</span>
            <span>Tipo</span>
            <span>Excluir</span>
          </div>
          {
            users.map((user, index) => (
              <ListItem
                key={ user.id }
                index={ index }
                itemNumber={ index + 1 }
                name={ user.name }
                testIds={ ['70', '71', '72', '73', '74'] }
                callback={ () => deleteUser(user.email) }
                info1={ user.email }
                info2={ user.role }
                btn="Excluir"
              />
            ))
          }
        </section>
      </main>
    </>
  );
};

export default AdminManage;
