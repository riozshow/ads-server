import Spinner from '../../../../common/Spinner/Spinner';
import PostRow from '../../../PostRow/PostRow';
import styles from './PostsList.module.scss';
import ListLoadingSpinner from '../../../../common/ListLoadingSpinner/ListLoadingSpinner';
import Placeholder from '../../../../common/Placeholder/Placeholder';
import Container from '../../../../common/Container/Container';
import InfiniteLoader from './components/InfiniteLoader';
import { useEffect, useRef } from 'react';
import useAsyncArray from '../../../../../hooks/useAsyncArray';

function PostsList({
  onScroll = () => {},
  caller,
  selector,
  reducer,
  cleaner,
  keyString,
  searchLoading,
  scrollTo = () => {},
}) {
  const ref = useRef();

  const [posts, postsLoading, next] = useAsyncArray({
    caller,
    selector,
    reducer,
    cleaner,
    keyString,
  });

  useEffect(() => {
    if (ref.current) {
      scrollTo(ref.current);
    }
  }, [ref]);

  const loading = searchLoading || postsLoading;
  const showBigSpinner = searchLoading || (postsLoading && !posts.length);
  const showSmallSpinner = postsLoading && posts.length > 0;

  return (
    <>
      <Container>
        {showBigSpinner && <Spinner />}
        <div ref={ref} onScroll={onScroll} className={styles.posts}>
          {posts
            .toSorted((a, b) => new Date(b.date) - new Date(a.date))
            .map((post) => (
              <PostRow key={post._id} {...post} />
            ))}
          {next && <InfiniteLoader first={true} next={next} />}
        </div>
      </Container>
      {!loading && posts.length === 0 && <Placeholder />}
      <ListLoadingSpinner show={showSmallSpinner} />
    </>
  );
}

export default PostsList;
