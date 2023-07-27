import { useState, MouseEvent } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BsPlusCircle } from "react-icons/bs";

import { BUDGETS } from "@/graphql/queries/budgets";
import { CREATE_BUDGET } from "./graphql/createBudget";

import { Layout } from "@/ui/Layout";
import { Loading } from "@/ui/Loading";
import { Error } from "@/ui/Error";
import { ButtonDotted } from "@/ui/Button";

import { List } from "./List";
import { Form } from "./Form";

import { Budgets } from "@/types";

export function Budgets() {
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { loading, error, data } = useQuery<Budgets>(BUDGETS);
  const addBudget = useMutation(CREATE_BUDGET, {
    onCompleted() {
      setActiveForm(false);
    },
    onError(error) {
      const { message } = error;

      setErrorMessage(message);

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    },
    refetchQueries: [BUDGETS],
  });

  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  function handleToggleForm(e: MouseEvent<HTMLButtonElement & HTMLDivElement>) {
    e.preventDefault();

    setActiveForm(!activeForm);
  }

  return (
    <Layout>
      <List budgets={data?.budgets} />

      {!activeForm && (
        <ButtonDotted handleAction={handleToggleForm} icon={BsPlusCircle}>
          Agregar presupuesto
        </ButtonDotted>
      )}

      {activeForm && (
        <Form
          handleAction={addBudget}
          handleToggleForm={handleToggleForm}
          error={errorMessage}
        />
      )}
    </Layout>
  );
}
