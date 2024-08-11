import React, { useState } from 'react';
import styles from './index.module.scss';
import { IconCrown, IconSetting, IconAddBox } from '@/assets/icongroup';
import instance from '@/services/axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useInviteModalStore } from '@/stores/modalStore';
import MemberList from './MemberList';
import { useUserStore } from '@/store/useUserStore';
import InviteModal from '@/containers/myDashboard/InviteModal';
import { ProfileIcon } from '@/components/ProfileIcon/ProfileIcon';
import ProfileDropdown from '@/components/ProfileDropdown';

const fetchDashboards = async (dashboardId: string) => {
  const response = await instance.get(`/dashboards/${dashboardId}`);
  return response.data;
};

export default function HeaderDashboard({ dashboardId }: HeaderDashboardProps) {
  const router = useRouter();
  const { id } = router.query;
  const currentId = dashboardId || String(id);

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { isLoading, error, data } = useQuery({
    queryKey: ['dashboardDetail', currentId],
    queryFn: () => fetchDashboards(currentId),
    enabled: currentId != 'undefined',
  });

  const { isModalOpen, setOpenModal } = useInviteModalStore();

  const nickname = user?.nickname ?? '';

  const handleManageClick = () => {
    router.push(`/dashboard/${currentId}/edit`);
  };

  if (!data) {
    return (
      <header className={`${styles['header-dashboard']}`}>
        <div
          className={`${styles['header-dashboard-container']} ${styles['flex-end-force']}`}
        >
          {user && <ProfileDropdown />}
        </div>
      </header>
    );
  }

  return (
    <header className={`${styles['header-dashboard']}`}>
      <div className={`${styles['header-dashboard-container']}`}>
        <div className={`${styles['dashboard-title-container']}`}>
          <p>{data.title}</p>
          {data.createdByMe && (
            <div className={`${styles['crown-size']}`}>
              <IconCrown
                style={{ width: '20px', height: '16px' }}
                aria-label={`owner icon`}
              />
            </div>
          )}
        </div>
        <div className={`${styles['dashboard-info-container']}`}>
          <div className={`${styles['dashboard-manage-button-area']}`}>
            {data.createdByMe && (
              <button
                className={`${styles['dashboard-manage-button']}`}
                onClick={handleManageClick}
              >
                <div>
                  <IconSetting
                    style={{ width: '20px', height: '20px' }}
                    aria-label={`setting icon`}
                  ></IconSetting>
                  관리
                </div>
              </button>
            )}
            <button
              className={`${styles['dashboard-manage-button']}`}
              onClick={setOpenModal}
            >
              <div>
                <IconAddBox
                  style={{ width: '20px', height: '20px' }}
                  aria-label={`add box icon`}
                ></IconAddBox>
                초대하기
              </div>
            </button>
          </div>
          <div className={`${styles['dashboard-member-area']}`}>
            <MemberList dashboardId={currentId}></MemberList>
            <div className={`${styles['dashboard-half-line']}`}></div>
            {user && <ProfileDropdown />}
          </div>
        </div>
      </div>
      {isModalOpen && <InviteModal id={currentId} />}
    </header>
  );
}
