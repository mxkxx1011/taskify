import getDate from '@/utils/getDate';
import Image from 'next/image';
import styles from './index.module.scss';

function Comment({ comment }: { comment: IComment }) {
  const {
    id: commentId,
    content,
    createdAt,
    updatedAt,
    cardId,
    author,
  } = comment;
  const { id, nickname, profileImageUrl } = author;
  return (
    <>
      <div className={styles['comment-card']}>
        {profileImageUrl ? (
          <Image
            className={styles['profile-img']}
            src={profileImageUrl}
            alt='프로필이미지'
          />
        ) : (
          <div className={styles['profile-img']}></div>
        )}
        <div className={styles['comment-contents']}>
          <div className={styles['writer-and-date']}>
            <p className={styles['writer']}>{nickname}</p>
            <p className={styles['date']}>{getDate(createdAt, true)}</p>
          </div>
          <p className={styles['comment-text']}>{content}</p>
          <div className={styles['edit-and-delete']}>
            <button className={styles['button']}>수정</button>
            <button className={styles['button']}>삭제</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
