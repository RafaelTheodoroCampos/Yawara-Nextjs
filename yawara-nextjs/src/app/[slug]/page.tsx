import { SanityDocument } from 'sanity';
import { cachedClient } from '../../../sanity/lib/client';
import { postPathsQuery, postQuery } from '../../../sanity/lib/queries';
import Post from '@/components/Post';
import PreviewPost from '@/components/PreviewPost';
import PreviewProvider from '@/components/PreviewProvider';
import { getCachedClient } from '../../../sanity/lib/getClient';
import { draftMode } from 'next/headers';

// Prepare Next.js to know which routes already exist
export async function generateStaticParams() {
  const posts = await cachedClient(postPathsQuery);

  return posts;
}

export default async function Page({ params }: { params: any }) {
  const preview = draftMode().isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;
  const post = await getCachedClient(preview)<SanityDocument>(
    postQuery,
    params
  );

  if (preview?.token) {
    return (
      <PreviewProvider token={preview.token}>
        <PreviewPost post={post} />
      </PreviewProvider>
    );
  }

  return <Post post={post} />;
}
