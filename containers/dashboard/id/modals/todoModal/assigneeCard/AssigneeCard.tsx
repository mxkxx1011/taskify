import styles from './AssigneeCard.module.scss';
import Image from 'next/image';
import profileImg from '@/assets/images/img_profileImg2.png';
import getDate from '@/utils/getDate';
import { ProfileIcon } from '@/components/ProfileIcon/ProfileIcon';
import { useTheme } from '@/hooks/useThemeContext';
import classNames from 'classnames';

export default function AssigneeCard({
  assignee,
  dueDate,
}: {
  assignee: IAssignee;
  dueDate: string | null;
}) {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles['container'], styles[theme])}>
      <div className={styles['title-and-contents']}>
        <p className={styles['title']}>담당자</p>
        {assignee ? (
          <div className={styles['assignee']}>
            <ProfileIcon
              nickname={assignee.nickname}
              imageUrl={assignee.profileImageUrl}
              comment={true}
            />
            <p className={styles['contents']}>{assignee.nickname}</p>
          </div>
        ) : (
          <div className={styles['contents']}>미정</div>
        )}
      </div>

      <div className={styles['title-and-contents']}>
        <p className={styles['title']}>마감일</p>
        <p className={classNames(styles['contents'], styles['date'])}>
          {getDate(dueDate, true)}
        </p>
      </div>
    </div>
  );
}
