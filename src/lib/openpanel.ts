import { OpenPanel } from '@openpanel/web';

// OpenPanel client ID.
const OPENPANEL_CLIENT_ID = '01523e53-ab15-4986-a310-3b378a569e9c';

export const op = new OpenPanel({
  clientId: OPENPANEL_CLIENT_ID,
  trackScreenViews: true,
  trackOutgoingLinks: true,
  trackAttributes: true,
  disabled: !OPENPANEL_CLIENT_ID,
});
