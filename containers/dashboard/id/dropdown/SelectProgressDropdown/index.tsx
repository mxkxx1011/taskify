import classNames from 'classNames';

import { useEffect, useRef, useState } from 'react';

import ChipProgress from '@/containers/dashboard/id/chips/ChipProgress';
import Dropdown from '../Dropdown';
import styles from './index.module.scss';
import useDetectClose from '@/hooks/useDetectClose';
import { IconArrowDown } from '@/assets/icongroup';

function SelectProgressDropdown({
  columnList,
  handleClick,
  currentColumn,
}: {
  columnList: IColumn[];
  handleClick?: any;
  currentColumn: IColumn[]; // 현재 컬럼 하나만 들어있는 배열
}) {
  const [selectedValue, setSelectedValue] = useState<IColumn>(currentColumn[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useDetectClose(dropdownRef, false);

  const handleOpenDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={dropdownRef} className={styles['select-input']}>
      <div
        className={classNames(styles['button'])}
        onClick={handleOpenDropdown}
      >
        <ChipProgress title={selectedValue.title} />
        <IconArrowDown className={isOpen ? styles['open'] : styles['close']} />
      </div>

      <Dropdown visibility={isOpen}>
        <ul className={styles['menu']}>
          {columnList.map((column: IColumn) => {
            return (
              <li
                key={column.id}
                value={column.id}
                className={styles['list']}
                onClick={handleClick}
              >
                <ChipProgress title={column.title} />
              </li>
            );
          })}
        </ul>
      </Dropdown>
    </div>
  );
}

export default SelectProgressDropdown;
