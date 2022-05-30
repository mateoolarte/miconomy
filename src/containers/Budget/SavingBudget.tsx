import { ReactElement, useState } from 'react';
import { useMutation } from '@apollo/client';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { BUDGET } from './graphql/budget';

import { DELETE_SAVING_BUDGET } from './graphql/deleteSavingBudget';
import { UPDATE_SAVING_BUDGET } from './graphql/updateSavingBudget';

import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';

import {
  Item,
  Info,
  Title,
  Description,
  Actions,
  BtnIcon,
} from './Budget.styles';

interface Props {
  saving: any;
  budget: any;
}

export function SavingBudget({ saving, budget }: Props): ReactElement {
  const [activeForm, setActiveForm] = useState(false);
  const [value, setValue] = useState(0);

  const [deleteSavingBudget] = useMutation(DELETE_SAVING_BUDGET, {
    refetchQueries: [BUDGET],
  });
  const [updateSavingBudget] = useMutation(UPDATE_SAVING_BUDGET, {
    refetchQueries: [BUDGET],
  });

  function resetState() {
    setValue(0);
    setActiveForm(false);
  }

  function handleDeleteSaving(budgetId, savingId) {
    deleteSavingBudget({ variables: { budgetId, savingId } });
  }

  function handleEditSaving(budgetId, savingId) {
    updateSavingBudget({
      variables: { budgetId, savingId, fee: value },
    });
    resetState();
  }

  return (
    <Item>
      <Info>
        <Title>{saving.name}</Title>
        <Description>
          Monto: <strong>{saving.fee}</strong>
        </Description>
      </Info>
      <Actions>
        <BtnIcon
          type="button"
          onClick={() => handleDeleteSaving(budget.id, saving.id)}
        >
          <DeleteOutlined />
        </BtnIcon>
        <BtnIcon
          type="button"
          onClick={() => {
            setActiveForm(!activeForm);
            setValue(saving.fee);
          }}
        >
          <EditOutlined />
        </BtnIcon>
      </Actions>

      <Modal
        visible={activeForm}
        title={`Editar ${saving.name}`}
        submitText="Actualizar"
        cancelText="Cancelar"
        handleSubmit={() => handleEditSaving(budget.id, saving.id)}
        handleCancel={() => setActiveForm(!activeForm)}
      >
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </Modal>
    </Item>
  );
}
