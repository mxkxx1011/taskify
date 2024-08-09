import Image from 'next/image';
import { User } from '@/types/User.interface';
import styles from './ProfileIcon.module.scss';
import getBackgroundColor from '@/utils/getBackgroundColor';

interface ProfileIconProps {
  user: User;
}

export function ProfileIcon({ user }: ProfileIconProps) {
  const backColor = getBackgroundColor(user.nickname);
  return (
    <div
      style={{ backgroundColor: backColor }}
      className={styles['profile-img']}
    >
      {user.profileImageUrl ? (
        <Image
          src={user.profileImageUrl}
          alt='프로필'
          fill
          className={styles['image']}
        />
      ) : (
        <p className={styles['substring']}>{user.nickname.substring(0, 1)}</p>
      )}
    </div>
  );
}
