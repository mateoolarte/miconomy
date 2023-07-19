import {
  MouseEvent,
  FormEvent,
  ChangeEvent,
  memo,
  useRef,
  useEffect,
  useState,
} from "react";

import { Box, Flex } from "@chakra-ui/react";

import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { Alert } from "@/ui/Alert";

interface FormProps {
  handleAction: any;
  handleToggleForm: (e: MouseEvent<HTMLButtonElement & HTMLDivElement>) => void;
  error: string;
}

function FormComponent(props: FormProps) {
  const { handleAction, handleToggleForm, error } = props;

  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [createBudget, { loading }] = handleAction;

  useEffect(() => {
    inputRef.current?.focus();
  }, [error]);

  useEffect(() => {
    if (error) setName("");
  }, [error]);

  function handleName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function submitForm(e: FormEvent<HTMLFormElement & HTMLDivElement>) {
    e.preventDefault();

    createBudget({ variables: { name } });
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
      {error && (
        <Box textAlign="left">
          <Alert status="error">{error}</Alert>
        </Box>
      )}
      <Input
        type="text"
        label="Nombre del presupuesto"
        value={name}
        onChange={handleName}
        required
        ref={inputRef}
      />
      <Flex gap={2} justifyContent="flex-end">
        <Button type="submit" disabled={loading}>
          Agregar
        </Button>
        <Button onClick={handleToggleForm} variant="outline" disabled={loading}>
          Cancelar
        </Button>
      </Flex>
    </Flex>
  );
}

export const Form = memo(FormComponent);
