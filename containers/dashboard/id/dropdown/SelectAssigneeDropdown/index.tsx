import classNames from 'classNames';

import { useEffect, useRef, useState } from 'react';

import ChipProgress from '@/containers/dashboard/id/chips/ChipProgress';
import Dropdown from '../Dropdown';
import styles from './index.module.scss';
import useDetectClose from '@/hooks/useDetectClose';
import useDashboardMember from '@/hooks/useDashboardMember';
import Assignee from './Assignee';
import { IconArrowDown } from '@/assets/icongroup';

function SelectAssigneeDropdown({
  dashboardId,
  selectedAssigneeValue,
  setSelectedAssigneeValue,
}: {
  dashboardId: string | string[] | undefined;
  selectedAssigneeValue: IAssignee | IMember | null;
  setSelectedAssigneeValue: any;
}) {
  const { dashboardMemberList, isLoading } = useDashboardMember(
    Number(dashboardId),
  );

  console.log('dashboardMemberList');
  console.log(dashboardMemberList);

  // assignee가 있으면 수정 모달에서 사용할 것

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useDetectClose(dropdownRef, false);

  const handleOpenDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  if (isLoading) return <div className={styles['select-input']}></div>;

  return (
    <div ref={dropdownRef} className={styles['select-input']}>
      <div
        className={classNames(styles['button'])}
        onClick={handleOpenDropdown}
      >
        {selectedAssigneeValue ? (
          <Assignee member={selectedAssigneeValue} />
        ) : (
          <>담당자를 선택해 주세요</>
        )}
        <IconArrowDown className={isOpen ? styles['open'] : styles['close']} />
      </div>

      <Dropdown visibility={isOpen}>
        <ul className={styles['menu']}>
          {dashboardMemberList.map((member: IMember) => {
            return (
              <li
                key={member.id}
                className={styles['list']}
                onClick={() => {
                  setSelectedAssigneeValue(member);
                  setIsOpen(false);
                }}
              >
                <Assignee member={member} />
              </li>
            );
          })}
        </ul>
      </Dropdown>
    </div>
  );
}

export default SelectAssigneeDropdown;
