import { Alert } from '@/ui/Alert';
import { Anchor } from '@/ui/Anchor';

interface EmptyStateProps {
  entryId: number | null;
}

export function EmptyState({ entryId }: EmptyStateProps) {
  if (entryId) return null;

  return (
    <>
      <Alert status="warning">
        <p>
          Aún no tienes un mes creado, empieza ahora y mide tus gastos.{' '}
          <Anchor link="/entry">Crear mes</Anchor>
        </p>
      </Alert>
    </>
  );
}
