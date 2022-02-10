import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { CATEGORIES } from './graphql/categories';
import { CREATE_CATEGORY } from './graphql/createCategory';
import { UPDATE_CATEGORY } from './graphql/updateCategory';

import { Input } from '../../ui/Input';

const initialState = { new: false, edit: false };

export function Categories(): ReactElement {
  const [activeForm, setActiveForm] = useState(initialState);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const { loading, error, data } = useQuery(CATEGORIES);
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [CATEGORIES],
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [CATEGORIES],
  });

  function resetState() {
    setActiveForm(initialState);
    setId(0);
    setName('');
  }

  function handleActiveForm(type) {
    setActiveForm({ ...initialState, [type]: true });
  }

  function handleInactiveForm(type) {
    setActiveForm({ ...initialState, [type]: false });
  }

  function handleEdit(e) {
    e.preventDefault();

    updateCategory({ variables: { id, name } });
    resetState();
  }

  function handleNew(e) {
    e.preventDefault();

    createCategory({ variables: { name } });
    resetState();
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;

  return (
    <section>
      {data?.categories.map((category) => {
        return (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <button
              type="button"
              onClick={() => {
                setName(category.name);
                setId(category.id);
                handleActiveForm('edit');
              }}
            >
              Editar
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          setName('');
          handleActiveForm('new');
        }}
      >
        Agregar categoría
      </button>
      {(activeForm.new || activeForm.edit) && (
        <div>
          <h3>{activeForm.new ? 'Nueva categoría' : 'Editar categoría'}</h3>
          <form onSubmit={activeForm.new ? handleNew : handleEdit}>
            <Input
              type="text"
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div>
              <button
                type="button"
                onClick={() =>
                  handleInactiveForm(activeForm.new ? 'new' : 'edit')
                }
              >
                Cancelar
              </button>
              <button type="submit" disabled={!name}>
                {activeForm.new ? 'Agregar' : 'Actualizar'}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
