import { ReactElement, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Icon, ListItem } from '@chakra-ui/react';
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi';

import { BUDGET } from './graphql/budget';

import { DELETE_CATEGORY_BUDGET } from './graphql/deleteCategoryBudget';
import { UPDATE_CATEGORY_BUDGET } from './graphql/updateCategoryBudget';

import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';

import { Info, Title, Description, Actions, BtnIcon } from './Budget.styles';

interface Props {
  category: any;
  budget: any;
}

export function CategoryBudget({ category, budget }: Props): ReactElement {
  const [activeForm, setActiveForm] = useState(false);
  const [value, setValue] = useState(0);

  const [deleteCategoryBudget] = useMutation(DELETE_CATEGORY_BUDGET, {
    refetchQueries: [BUDGET],
  });
  const [updateCategoryBudget] = useMutation(UPDATE_CATEGORY_BUDGET, {
    refetchQueries: [BUDGET],
  });

  function resetState() {
    setValue(0);
    setActiveForm(false);
  }

  function handleDeleteCategory(budgetId, categoryId) {
    deleteCategoryBudget({ variables: { budgetId, categoryId } });
  }

  function handleEditCategory(budgetId, categoryId) {
    updateCategoryBudget({
      variables: { budgetId, categoryId, amount: value },
    });
    resetState();
  }

  return (
    <ListItem>
      <Info>
        <Title>{category.name}</Title>
        <Description>
          Presupuesto: <strong>{category.amount}</strong>
        </Description>
      </Info>
      <Actions>
        <BtnIcon
          type="button"
          onClick={() => handleDeleteCategory(budget.id, category.id)}
        >
          <Icon as={BiTrashAlt} fontSize="xl" />
        </BtnIcon>
        <BtnIcon
          type="button"
          onClick={() => {
            setActiveForm(!activeForm);
            setValue(category.amount);
          }}
        >
          <Icon as={BiEditAlt} fontSize="xl" />
        </BtnIcon>
      </Actions>

      <Modal
        visible={activeForm}
        title={`Editar ${category.name}`}
        submitText="Actualizar"
        cancelText="Cancelar"
        handleSubmit={() => handleEditCategory(budget.id, category.id)}
        handleCancel={() => setActiveForm(!activeForm)}
      >
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </Modal>
    </ListItem>
  );
}
