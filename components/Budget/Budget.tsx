import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import { BUDGET } from "./graphql/budget";
import { UPDATE_BUDGET } from "./graphql/updateBudget";

import { Layout } from "@/ui/Layout";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { Tabs } from "@/ui/Tabs";
import { Loading } from "@/ui/Loading";
import { Error } from "@/ui/Error";

import { CategoriesBudget } from "./CategoriesBudget";
import { SavingsBudget } from "./SavingsBudget";

export function Budget() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");

  const { loading, error, data } = useQuery(BUDGET, {
    variables: { id: Number(id) },
  });
  const [updateBudget] = useMutation(UPDATE_BUDGET, {
    refetchQueries: [BUDGET],
  });

  useEffect(() => {
    setName(data?.budget?.name);
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  const { budget } = data;
  const { categories, savings } = budget;

  const tabs = [
    {
      key: "1",
      title: "Categorías",
      content: (
        <CategoriesBudget budgetCategories={categories} budget={budget} />
      ),
    },
    {
      key: "2",
      title: "Ahorros",
      content: <SavingsBudget budgetSavings={savings} budget={budget} />,
    },
  ];

  function handleName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function updateBudgetName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateBudget({ variables: { id: Number(budget?.id), name } });
  }

  return (
    <Layout>
      <Box as="form" onSubmit={updateBudgetName} mb={6}>
        <Input
          type="text"
          label="Nombre"
          value={name}
          onChange={handleName}
          required
        />
        <Box textAlign="right" mt={2}>
          <Button type="submit" disabled={!name}>
            Actualizar
          </Button>
        </Box>
      </Box>

      <Tabs options={tabs} centered />
    </Layout>
  );
}
