import { ReactElement, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_INCOME } from './graphql/addIncome';

import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';

export interface IncomeModalProps {
  toggleIncomeModal: boolean;
  setToggleIncomeModal: any;
  userMonthId: number;
}

export default function IncomeModal({
  toggleIncomeModal,
  setToggleIncomeModal,
  userMonthId,
}: IncomeModalProps): ReactElement {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const isValid = value === 0 || description === '' || errors['description'];
  const [addIncome] = useMutation(ADD_INCOME);

  function resetState() {
    setToggleIncomeModal(false);
    setValue(0);
    setDescription('');
    setErrors({});
  }

  function handleValue(e) {
    const value = Number(e.target.value);

    if (value <= 0) {
      setErrors({
        ...errors,
        value: 'El valor debe ser mayor a cero',
      });
    }

    if (value > 0) {
      setErrors({
        ...errors,
        value: '',
      });
    }

    setValue(value);
  }

  function handleDescription(e) {
    const value = e.target.value;

    if (value.length <= 3) {
      setErrors({
        ...errors,
        description: 'La descripción debe tener más de 3 caracteres',
      });
    }

    if (value.length > 3) {
      setErrors({
        ...errors,
        description: '',
      });
    }

    setDescription(value);
  }

  function handleIncome(e) {
    e.preventDefault();

    addIncome({ variables: { userMonthId, value, description } });
    resetState();
  }

  return (
    <Modal
      isActive={toggleIncomeModal}
      handleClose={() => setToggleIncomeModal(false)}
    >
      <form onSubmit={handleIncome}>
        <h3 className="text-center font-semibold mb-4">Agregar ingreso</h3>
        <Input
          type="number"
          label="Valor"
          value={value}
          errorMessage={errors['value']}
          onChange={handleValue}
        />
        <Textarea
          label="Descripción"
          required
          value={description}
          errorMessage={errors['description']}
          onChange={handleDescription}
        />
        <div className="text-center">
          <Button type="submit" color="green" size="medium" disabled={isValid}>
            Agregar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
