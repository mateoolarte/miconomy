import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import {
  Heading,
  Title,
  List,
  Item,
  ItemLink,
  ItemTitle,
  ItemText,
  ItemContent,
  ItemSavingText,
  ItemSaving,
} from './Entry.styles';

interface ContentProps {
  categories: any;
  savings: any;
  entryId: number | null;
}

export function Content(props: ContentProps) {
  var { categories, savings, entryId } = props;

  if (!entryId) return null;

  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var currentMonth = format(currentDate, 'MMMM', { locale: es });

  const pendingSavings = savings?.filter((item) => !item.sent).length;

  return (
    <>
      <Heading>
        Mes actual
        <p>
          {currentMonth} {year}
        </p>
      </Heading>

      <Title>Categorías</Title>
      <List>
        {categories.map((item) => {
          const totalExpenses = item.expenses.reduce(
            (prev, current) => prev + current.value,
            0
          );
          const lastExpense = item.expenses[item.expenses.length - 1];

          return (
            <Item key={item.id}>
              <Link
                href={`/entry/categories/${item.id}?entryId=${entryId}`}
                passHref
              >
                <ItemLink>
                  <ItemTitle>{item.name}</ItemTitle>
                  <ItemContent>
                    <ItemText>
                      Presupuesto <strong>{item.amount}</strong>
                    </ItemText>
                    {totalExpenses > 0 && (
                      <ItemText>
                        Gasto actual <strong>{totalExpenses}</strong>
                      </ItemText>
                    )}
                  </ItemContent>
                  {lastExpense && (
                    <ItemText>
                      Último gasto
                      <strong>
                        {lastExpense?.description} {lastExpense?.value}
                      </strong>
                    </ItemText>
                  )}
                </ItemLink>
              </Link>
            </Item>
          );
        })}

        {savings?.length > 0 && (
          <Item>
            <Link legacyBehavior href={`/savings`}>
              <ItemLink>
                <ItemTitle>Ahorros</ItemTitle>
                {pendingSavings === 0 && (
                  <ItemSavingText>
                    ¡Felicitaciones! Has completado todos los ahorros de este
                    mes
                  </ItemSavingText>
                )}
                {pendingSavings > 0 && (
                  <ItemSavingText>
                    Tienes pendiente de enviar {pendingSavings}
                    {pendingSavings > 1 ? ' abonos' : ' abono'}
                  </ItemSavingText>
                )}
                {savings
                  ?.filter((item) => !item.sent)
                  .map((item) => {
                    return (
                      <ItemSaving key={item.id}>
                        {item.name} {item.fee}
                      </ItemSaving>
                    );
                  })}
              </ItemLink>
            </Link>
          </Item>
        )}
      </List>
    </>
  );
}
