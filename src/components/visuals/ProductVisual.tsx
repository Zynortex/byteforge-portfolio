import type { ProjectVisual } from '../../types';
import { ByteCheckVisual } from './ByteCheckVisual';
import { ByteReportVisual } from './ByteReportVisual';
import { LeadNovaVisual } from './LeadNovaVisual';

export function ProductVisual({ kind }: { kind: ProjectVisual }) {
  switch (kind) {
    case 'leadnova':
      return <LeadNovaVisual />;
    case 'bytereport':
      return <ByteReportVisual />;
    case 'bytecheck':
      return <ByteCheckVisual />;
  }
}
