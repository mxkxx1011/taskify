import Image from 'next/image';
import styles from './index.module.scss';

function Assignee({ member }: { member: IMember | IAssignee }) {
  const { nickname, profileImageUrl } = member;
  return (
    <div className={styles['assignee']}>
      {profileImageUrl ? (
        <Image
          className={styles['profile-img']}
          src={profileImageUrl}
          alt='profile-img'
          width={26}
          height={26}
        />
      ) : (
        <div className={styles['profile-img']}></div>
      )}
      <p>{nickname}</p>
    </div>
  );
}

export default Assignee;
