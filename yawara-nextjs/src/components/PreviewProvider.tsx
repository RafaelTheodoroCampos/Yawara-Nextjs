'use client';

import { LiveQueryProvider } from '@sanity/preview-kit';
import { useMemo } from 'react';
import { getClient } from '../../sanity/lib/getClient';

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const client = useMemo(() => getClient({ token }), [token]);
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
