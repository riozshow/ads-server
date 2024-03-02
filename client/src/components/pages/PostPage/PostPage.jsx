import { useParams } from 'react-router-dom';
import usePostData from './hooks/usePostData';
import styles from './PostPage.module.scss';
import Container from '../../common/Container/Container';
import { imageSrc } from '../../../utils/imgSrc';
import useUserData from './hooks/useUserData';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/userSlice';
import { dateConvert } from '../../../utils/dateConvert';
import { currencyConvert } from '../../../utils/currencyConvert';
import OptionButtons from './componenets/OptionButtons';

function PostPage() {
  const { id } = useParams();
  const loggedUser = useSelector(getUser);
  const [post, loading] = usePostData(id);
  const [user, loadingUser] = useUserData(post.userId);
  const isOwned = loggedUser._id === post.userId;

  const { image, content, date, location, price, title } = post;
  const { login, phone, avatar } = user;

  return (
    <Container className={'p-3'}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            className={!image ? styles.noImage : ''}
            src={imageSrc(image)}
            alt={'image'}
          />
          <div className='w-100 d-flex flex-column gap-3'>
            <div className='d-flex justify-content-between w-100'>
              <p>{dateConvert.date(date)}</p>
              <p>{dateConvert.time(date)}</p>
            </div>
            <h2>{title}</h2>
            <h5 className={`${styles.price}`}>{currencyConvert(price)}</h5>
            {isOwned && <OptionButtons post={post} />}
            <p className={styles.description}>{content}</p>
            <div className='d-flex align-items-center gap-1'>
              <i className='bi bi-geo-alt'></i>
              <p>{location}</p>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <img
            src={imageSrc(avatar || 'profile.png')}
            className={`${styles.userImg} ${avatar ? '' : styles.noImage}`}
          />
          <div
            className={`${styles.userInfo} d-flex flex-column gap-1 align-items-center`}>
            <h5>{login}</h5>
            <div className='d-flex align-items-center gap-3'>
              <i className='bi bi-telephone-fill'></i>
              <p>{phone}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default PostPage;
