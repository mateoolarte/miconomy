import {
  MouseEvent,
  FormEvent,
  ChangeEvent,
  memo,
  useRef,
  useEffect,
  useState,
} from "react";

import { Flex } from "@chakra-ui/react";

import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";

interface FormProps {
  handleForm: (name: string) => void;
  handleToggleForm: (e: MouseEvent<HTMLButtonElement & HTMLDivElement>) => void;
}

function FormComponent(props: FormProps) {
  const { handleForm, handleToggleForm } = props;

  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function submitForm(e: FormEvent<HTMLFormElement & HTMLDivElement>) {
    e.preventDefault;

    handleForm(name);
  }

  return (
    <Flex
      as="form"
      mt={4}
      textAlign="right"
      flexDirection="column"
      gap={3}
      onSubmit={submitForm}
    >
      <Input
        type="text"
        label="Nombre del presupuesto"
        value={name}
        onChange={handleName}
        required
        ref={inputRef}
      />
      <Flex gap={2} justifyContent="flex-end">
        <Button type="submit">Agregar</Button>
        <Button onClick={handleToggleForm} variant="outline">
          Cancelar
        </Button>
      </Flex>
    </Flex>
  );
}

export const Form = memo(FormComponent);
