import { ProfileIcon } from '@/components/ProfileIcon/ProfileIcon';
import { useTheme } from '@/hooks/useThemeContext';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './index.module.scss';

function Assignee({ member }: { member: IMember | IAssignee }) {
  const { nickname, profileImageUrl } = member;

  const { theme } = useTheme();

  return (
    <div className={classNames(styles['assignee'], styles[theme])}>
      <ProfileIcon nickname={nickname} imageUrl={profileImageUrl} />
      <p>{nickname}</p>
    </div>
  );
}

export default Assignee;
