import clsx from 'clsx';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostsCached } from '@/lib/post/queries/public';

export async function PostsList() {
  const posts = await findAllPublicPostsCached();

  if (posts.length <= 1) {
    return null;
  }

  return (
    <div
      className={clsx(
        'grid grid-cols-1 mb-16 gap-8',
        'sm:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {posts.map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className='flex flex-col gap-4 group' key={post.id}>
            <PostCoverImage
              linkProps={{
                href: postLink,
              }}
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
              }}
            />

            <PostSummary
              postHeading={'h2'}
              postLink={postLink}
              createdAt={post.createdAt}
              title={post.title}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
