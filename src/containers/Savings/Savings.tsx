import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { ENTRY } from '../../graphql/queries/entry';
import { SAVINGS } from '../../graphql/queries/savings';
import { UPDATE_SAVING } from './graphql/updateSaving';
import { DELETE_SAVING } from './graphql/deleteSaving';
import { CREATE_SAVING } from './graphql/createSaving';
import { SEND_SAVING } from './graphql/sendSaving';

import { Input } from '../../ui/Input';
import { Layout } from '../../ui/Layout';

const initialState = {
  edit: false,
  delete: false,
  add: false,
  remove: false,
  new: false,
};

export function Savings(): ReactElement {
  // TODO: Integration of tooltip with information, see reference from Figma mockups
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const [activeForm, setActiveForm] = useState(initialState);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState(0);
  const [value, setValue] = useState(0);
  const [valueToRemove, setValueToRemove] = useState(0);
  const [valueToAdd, setValueToAdd] = useState(0);

  const { loading, error, data } = useQuery(SAVINGS);
  const { error: errorEntry, data: dataEntry } = useQuery(ENTRY, {
    variables: { month, year },
  });
  const [updateSaving] = useMutation(UPDATE_SAVING, {
    refetchQueries: [SAVINGS],
  });
  const [deleteSaving] = useMutation(DELETE_SAVING, {
    refetchQueries: [SAVINGS],
  });
  const [createSaving] = useMutation(CREATE_SAVING, {
    refetchQueries: [SAVINGS],
  });
  const [sendSaving] = useMutation(SEND_SAVING, {
    refetchQueries: [SAVINGS, ENTRY],
  });

  function resetState() {
    setActiveForm(initialState);
    setId(0);
    setName('');
    setGoal(0);
    setValue(0);
    setValueToRemove(0);
    setValueToAdd(0);
  }

  function handleActiveForm(type) {
    setActiveForm({ ...initialState, [type]: true });
  }

  function handleInactiveForm() {
    resetState();
  }

  function handleEdit(e) {
    e.preventDefault();

    updateSaving({ variables: { id, name, goal, value } });
    resetState();
  }

  function handleDelete(e) {
    e.preventDefault();

    deleteSaving({ variables: { id } });
    resetState();
  }

  function handleAdd(e) {
    e.preventDefault();

    updateSaving({
      variables: { id, name, goal, value: value + valueToAdd },
    });
    resetState();
  }

  function handleRemove(e) {
    e.preventDefault();

    updateSaving({
      variables: { id, name, goal, value: value - valueToRemove },
    });
    resetState();
  }

  function handleNew(e) {
    e.preventDefault();

    createSaving({ variables: { name, goal, value } });
    resetState();
  }

  function handleSendSaving(id, value) {
    sendSaving({ variables: { id, value, entryId: dataEntry?.entry?.id } });
    resetState();
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;
  if (errorEntry) return <h2>Error! {errorEntry.message}</h2>;

  return (
    <Layout>
      {dataEntry?.entry?.savings
        .filter((item) => !item.sent)
        .map((item) => {
          return (
            <div key={item.id}>
              Tienes pendiente enviar a tu ahorro mensual de {item.name} de{' '}
              {item.fee}
              <button
                type="button"
                onClick={() => handleSendSaving(item.id, item.fee)}
              >
                Enviar
              </button>
            </div>
          );
        })}

      {data?.savings.map((saving) => {
        return (
          <div key={saving.id}>
            <h2>{saving.name}</h2>
            <div>
              <button
                type="button"
                onClick={() => {
                  setId(saving.id);
                  setName(saving.name);
                  setGoal(saving.goal);
                  setValue(saving.value);
                  handleActiveForm('edit');
                }}
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => {
                  setId(saving.id);
                  setName(saving.name);
                  handleActiveForm('delete');
                }}
              >
                Eliminar
              </button>
            </div>
            <p>Objetivo: {saving.goal}</p>
            <p>Ahorro actual: {saving.value}</p>
            <div>
              <button
                type="button"
                onClick={() => {
                  setId(saving.id);
                  setName(saving.name);
                  setGoal(saving.goal);
                  setValue(saving.value);
                  handleActiveForm('add');
                }}
              >
                Agregar
              </button>
              <button
                type="button"
                onClick={() => {
                  setId(saving.id);
                  setName(saving.name);
                  setGoal(saving.goal);
                  setValue(saving.value);
                  handleActiveForm('remove');
                }}
              >
                Retirar
              </button>
            </div>
          </div>
        );
      })}
      <button type="button" onClick={() => handleActiveForm('new')}>
        Agregar ahorro
      </button>
      {activeForm.edit && (
        <div>
          <h3>Editar ahorro</h3>
          <form onSubmit={handleEdit}>
            <Input
              type="text"
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="number"
              label="Objetivo"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              required
            />
            <div>
              <button type="button" onClick={() => handleInactiveForm()}>
                Cancelar
              </button>
              <button type="submit">Editar</button>
            </div>
          </form>
        </div>
      )}
      {activeForm.delete && (
        <div>
          <p>¿Estás seguro que deseas eliminar este ahorro?</p>
          <h3>{name}</h3>
          <div>
            <button type="submit" onClick={handleDelete}>
              Eliminar
            </button>
            <button type="button" onClick={() => handleInactiveForm()}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {activeForm.add && (
        <div>
          <h3>Agregar ahorro a {name}</h3>
          <p>Ahorro actual: {value}</p>
          <form onSubmit={handleAdd}>
            <Input
              type="number"
              label="¿Cuanto quieres agregar?"
              value={valueToAdd}
              onChange={(e) => setValueToAdd(Number(e.target.value))}
              required
            />
            <div>
              <button type="button" onClick={() => handleInactiveForm()}>
                Cancelar
              </button>
              <button type="submit">Agregar</button>
            </div>
          </form>
        </div>
      )}
      {activeForm.remove && (
        <div>
          <h3>Retirar ahorro de {name}</h3>
          <p>Valor disponible: {value}</p>
          <form onSubmit={handleRemove}>
            <Input
              type="number"
              label="¿Cuanto quieres retirar?"
              value={valueToRemove}
              onChange={(e) => setValueToRemove(Number(e.target.value))}
              required
            />
            <div>
              <button type="submit">Retirar</button>
              <button type="button" onClick={() => handleInactiveForm()}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
      {activeForm.new && (
        <div>
          <h3>Agregar ahorro</h3>
          <form onSubmit={handleNew}>
            <Input
              type="text"
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="number"
              label="Objetivo"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              required
            />
            <Input
              type="text"
              label="Valor inicial (Opcional)"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <div>
              <button type="button" onClick={() => handleInactiveForm()}>
                Cancelar
              </button>
              <button type="submit">Agregar</button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
}
