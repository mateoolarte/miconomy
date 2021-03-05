import { ReactElement, useState } from 'react';

import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

export interface IncomeModalProps {
  toggleIncomeModal: boolean;
  setToggleIncomeModal: any;
}

export default function IncomeModal({
  toggleIncomeModal,
  setToggleIncomeModal,
}: IncomeModalProps): ReactElement {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');

  function handleIncome(e) {
    e.preventDefault();

    setToggleIncomeModal(false);
    setValue(0);
    setDescription('');
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
          errorMessage=""
          onChange={e => setValue(e.target.value)}
        />
        <Textarea
          label="Descripción"
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <div className="text-center">
          <Button
            type="submit"
            color="green"
            size="medium"
            disabled={value === 0 || description === ''}
          >
            Agregar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
