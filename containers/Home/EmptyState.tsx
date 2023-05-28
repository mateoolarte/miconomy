import { ButtonLink } from '@/ui/ButtonLink';

import { Heading } from './Home.styles';

export function EmptyState({ entryId }: { entryId: any }) {
  if (entryId) return null;

  return (
    <>
      <Heading>
        Aún no tienes un mes creado, empieza ahora y mide tus gastos
      </Heading>
      <ButtonLink link="/entry" fullwidth>
        Crear mes
      </ButtonLink>
    </>
  );
}
