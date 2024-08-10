import styles from './assigneeCard.module.scss';
import Image from 'next/image';
import profileImg from '@/assets/images/img_profileImg2.png';
import getDate from '@/utils/getDate';
import { ProfileIcon } from '@/components/ProfileIcon/ProfileIcon';

export default function AssigneeCard({
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
        <div className={styles['assignee']}>
          <ProfileIcon nickname={nickname} imageUrl={profileImageUrl} />
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
