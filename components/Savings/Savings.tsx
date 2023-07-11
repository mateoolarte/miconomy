import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Icon } from '@chakra-ui/react';
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi';
import { BsPlusCircle } from 'react-icons/bs';

import { ENTRY } from '../../graphql/queries/entry';
import { SAVINGS } from '../../graphql/queries/savings';
import { UPDATE_SAVING } from './graphql/updateSaving';
import { DELETE_SAVING } from './graphql/deleteSaving';
import { CREATE_SAVING } from './graphql/createSaving';
import { SEND_SAVING } from './graphql/sendSaving';

import { Input } from '../../ui/Input';
import { Layout } from '../../ui/Layout';
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';

import {
  Notification,
  NotificationText,
  Box,
  Title,
  PrimaryActions,
  BtnIcon,
  Description,
  Info,
  SecondaryActions,
  Container,
  AddSaving,
} from './Savings.styles';

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
            <Notification key={item.id}>
              <NotificationText>
                Tienes pendiente enviar a tu ahorro mensual de{' '}
                <strong>{item.name}</strong> de <strong>{item.fee}</strong>
              </NotificationText>
              <Button
                type="button"
                size="middle"
                style="primary"
                onClick={() => handleSendSaving(item.id, item.fee)}
              >
                Enviar
              </Button>
            </Notification>
          );
        })}

      <Container>
        {data?.savings.map((saving) => {
          return (
            <Box key={saving.id}>
              <Title>
                {saving.name}
                <PrimaryActions>
                  <BtnIcon
                    type="button"
                    onClick={() => {
                      setId(saving.id);
                      setName(saving.name);
                      setGoal(saving.goal);
                      setValue(saving.value);
                      handleActiveForm('edit');
                    }}
                  >
                    <Icon as={BiEditAlt} fontSize="xl" />
                  </BtnIcon>
                  <BtnIcon
                    type="button"
                    onClick={() => {
                      setId(saving.id);
                      setName(saving.name);
                      handleActiveForm('delete');
                    }}
                  >
                    <Icon as={BiTrashAlt} fontSize="xl" />
                  </BtnIcon>
                </PrimaryActions>
              </Title>

              <Info>
                <Description>
                  Objetivo: <strong>{saving.goal}</strong>
                </Description>
                <Description>
                  Ahorro actual: <strong>{saving.value}</strong>
                </Description>
              </Info>
              <SecondaryActions>
                <Button
                  type="button"
                  style="primary"
                  size="large"
                  onClick={() => {
                    setId(saving.id);
                    setName(saving.name);
                    setGoal(saving.goal);
                    setValue(saving.value);
                    handleActiveForm('add');
                  }}
                >
                  Agregar
                </Button>
                <Button
                  type="button"
                  style="ghost"
                  size="large"
                  onClick={() => {
                    setId(saving.id);
                    setName(saving.name);
                    setGoal(saving.goal);
                    setValue(saving.value);
                    handleActiveForm('remove');
                  }}
                >
                  Retirar
                </Button>
              </SecondaryActions>
            </Box>
          );
        })}
      </Container>

      <AddSaving type="button" onClick={() => handleActiveForm('new')}>
        <Icon as={BsPlusCircle} mr={2} fontSize="lg" />
        Agregar ahorro
      </AddSaving>

      <Modal
        visible={activeForm.edit}
        title="Editar ahorro"
        submitText="Editar"
        cancelText="Cancelar"
        handleSubmit={handleEdit}
        handleCancel={() => handleInactiveForm()}
      >
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
      </Modal>

      <Modal
        visible={activeForm.delete}
        title="Eliminar ahorro"
        submitText="Eliminar"
        cancelText="Cancelar"
        handleSubmit={handleDelete}
        handleCancel={() => handleInactiveForm()}
      >
        <p>¿Estás seguro que deseas eliminar este ahorro?</p>
        <h3>{name}</h3>
      </Modal>

      <Modal
        visible={activeForm.add}
        title="Agregar monto"
        submitText="Agregar"
        cancelText="Cancelar"
        handleSubmit={handleAdd}
        handleCancel={() => handleInactiveForm()}
      >
        <h3>Agregar ahorro a {name}</h3>
        <p>Ahorro actual: {value}</p>

        <Input
          type="number"
          label="¿Cuanto quieres agregar?"
          value={valueToAdd}
          onChange={(e) => setValueToAdd(Number(e.target.value))}
          required
        />
      </Modal>

      <Modal
        visible={activeForm.remove}
        title="Retirar monto"
        submitText="Retirar"
        cancelText="Cancelar"
        handleSubmit={handleRemove}
        handleCancel={() => handleInactiveForm()}
      >
        <h3>Retirar ahorro de {name}</h3>
        <p>Valor disponible: {value}</p>

        <Input
          type="number"
          label="¿Cuanto quieres retirar?"
          value={valueToRemove}
          onChange={(e) => setValueToRemove(Number(e.target.value))}
          required
        />
      </Modal>

      <Modal
        visible={activeForm.new}
        title="Agregar ahorro"
        submitText="Agregar"
        cancelText="Cancelar"
        handleSubmit={handleNew}
        handleCancel={() => handleInactiveForm()}
      >
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
      </Modal>
    </Layout>
  );
}
