import AddButton from './components/AddButton/AddButton';
import styles from './PostsBox.module.scss';
import useScrollHandler from '../../../hooks/useScrollHandler';
import { useState } from 'react';
import PostsList from './components/PostsList/PostsList';
import { API } from '../../../api/api';
import {
  getAllPosts,
  addPosts,
  getAllSearchedPosts,
  addSearchedPosts,
  clearSearchedPosts,
} from '../../../store/postsSlice';
import Container from '../../common/Container/Container';
import SearchLazy from '../../common/SearchLazy/SearchLazy';

function PostsBox() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState();
  const isSearching = search.length > 0;

  const { onScroll, topOrBackScroll, scrollTo } = useScrollHandler({
    saveScrollId: 'mainList',
  });

  const showTopBar = isSearching || topOrBackScroll;

  return (
    <div className={styles.container}>
      <div className={`${styles.topBar} ${showTopBar ? styles.show : ''}`}>
        <Container className={'d-flex gap-3 px-3'}>
          <AddButton />
          <SearchLazy onChange={setSearch} setLoading={setLoading} />
        </Container>
      </div>
      <PostsList
        caller={
          !isSearching
            ? API.posts.getAllPosts
            : (pages) => API.posts.searchPosts(search, pages)
        }
        selector={!isSearching ? getAllPosts : getAllSearchedPosts}
        reducer={!isSearching ? addPosts : addSearchedPosts}
        cleaner={clearSearchedPosts}
        keyString={search}
        searchLoading={loading}
        onScroll={onScroll}
        scrollTo={scrollTo}
      />
    </div>
  );
}

export default PostsBox;
