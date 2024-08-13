import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './ProfileIcon.module.scss';
import getBackgroundColor from '@/utils/getBackgroundColor';
import { useTheme } from '@/hooks/useThemeContext';
import classNames from 'classnames';

interface ProfileIconProps {
  nickname: string;
  imageUrl: string | null;
  compressRemain?: boolean;
  comment?: boolean;
  card?: boolean;
}

export function ProfileIcon({
  nickname,
  imageUrl,
  compressRemain = false,
  comment = false,
  card = false,
}: ProfileIconProps) {
  const [displayedImageUrl, setDisplayedImageUrl] = useState<string | null>(
    imageUrl,
  );
  const backColor = getBackgroundColor(nickname);
  const name = compressRemain ? nickname : nickname.substring(0, 1);
  const { theme } = useTheme();

  useEffect(() => {
    setDisplayedImageUrl(imageUrl);
  }, [imageUrl]);

  if (displayedImageUrl) {
    return (
      <div
        className={classNames(
          styles['profile-img'],
          styles[theme],
          card ? styles['card'] : '',
          comment ? styles['comment'] : '',
        )}
      >
        <Image
          src={displayedImageUrl}
          alt='프로필'
          fill
          className={styles['image']}
        />
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: backColor }}
      className={classNames(styles['profile-img'], styles[theme])}
    >
      <p className={styles['substring']}>{name}</p>
    </div>
  );
}
