import Image from 'next/image';
import { User } from '@/types/User.interface';
import styles from './ProfileIcon.module.scss';
import getBackgroundColor from '@/utils/getBackgroundColor';

interface ProfileIconProps {
  nickname: string;
  imageUrl: string | null;
}

export function ProfileIcon({ nickname, imageUrl }: ProfileIconProps) {
  const backColor = getBackgroundColor(nickname);
  return (
    <div
      style={{ backgroundColor: backColor }}
      className={styles['profile-img']}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt='프로필' fill className={styles['image']} />
      ) : (
        <p className={styles['substring']}>{nickname.substring(0, 1)}</p>
      )}
    </div>
  );
}
