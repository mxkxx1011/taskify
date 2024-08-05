import styles from './ManagerCard.module.scss';
import Image from 'next/image';
import profileImg from '@/assets/images/img_profileImg2.png';
import getDate from '@/utils/getDate';

export default function ManagerCard({
  assignee,
  dueDate,
}: {
  assignee: IAssignee;
  dueDate: string | null;
}) {
  const { profileImageUrl, nickname } = assignee;
  return (
    <div className={styles['container']}>
      <div className={styles['title-and-contents']}>
        <p className={styles['title']}>담당자</p>
        <div className={styles['manager']}>
          {profileImageUrl ? (
            <Image
              className={styles['profileImg']}
              src={profileImageUrl}
              alt='프로필 이미지'
            />
          ) : (
            <Image
              className={styles['profileImg']}
              src={profileImg}
              alt='프로필 이미지'
            />
          )}
          <p className={styles['contents']}>{nickname}</p>
        </div>
      </div>
      <div className={styles['title-and-contents']}>
        <p className={styles['title']}>마감일</p>
        <p className={styles['contents']}>{getDate(dueDate, true)}</p>
      </div>
    </div>
  );
}
