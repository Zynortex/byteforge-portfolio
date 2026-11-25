import type { ProjectVisual } from '../../types';
import { ByteCheckVisual } from './ByteCheckVisual';
import { LeadNovaVisual } from './LeadNovaVisual';

export function ProductVisual({ kind }: { kind: ProjectVisual }) {
  switch (kind) {
    case 'leadnova':
      return <LeadNovaVisual />;
    case 'bytecheck':
      return <ByteCheckVisual />;
  }
}
