import Dropdown from '@/containers/dashboard/id/dropdown/Dropdown';
import styles from './index.module.scss';
import useDetectClose from '@/hooks/useDetectClose';
import { useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ProfileIcon } from '../ProfileIcon/ProfileIcon';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/router';

function ProfileDropdown({}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useDetectClose(dropdownRef, false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { user } = useUserStore();

  const handleOpenDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  if (!user) return <></>;

  return (
    <div ref={dropdownRef} className={styles['dropdown']}>
      <div onClick={handleOpenDropdown} className={`${styles['dashboard-my']}`}>
        <ProfileIcon
          nickname={user.nickname}
          imageUrl={user.profileImageUrl as string | null}
        />
        <p>{user.nickname}</p>
      </div>

      <Dropdown visibility={isOpen}>
        <ul className={styles['container']}>
          <li className={styles['list']} onClick={() => router.push('/mypage')}>
            마이페이지
          </li>
          <li
            className={styles['list']}
            onClick={() => {
              // 로그아웃 기능 추가
            }}
          >
            로그아웃
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}

export default ProfileDropdown;
