import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { CATEGORIES } from '../../graphql/queries/categories';
import { CREATE_CATEGORY } from '../../graphql/mutations/createCategory';
import { UPDATE_CATEGORY } from '../../graphql/mutations/updateCategory';

import { Input } from '../../components/ui/Input';

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
    setActiveForm({ ...activeForm, [type]: true });
  }

  function handleInactiveForm(type) {
    setActiveForm({ ...activeForm, [type]: false });
  }

  function handleEditCategory(e) {
    e.preventDefault();

    updateCategory({ variables: { id, name } });
    resetState();
  }

  function handleNewCategory(e) {
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
                handleActiveForm('edit');
                setName(category.name);
                setId(category.id);
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
          handleActiveForm('new');
          setName('');
        }}
      >
        Agregar categoría
      </button>
      {(activeForm.new || activeForm.edit) && (
        <div>
          <h3>{activeForm.new ? 'Nueva categoría' : 'Editar categoría'}</h3>
          <form
            onSubmit={activeForm.new ? handleNewCategory : handleEditCategory}
          >
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
