import classNames from 'classnames';

import { useEffect, useRef, useState } from 'react';

import ChipProgress from '@/containers/dashboard/id/chips/ChipProgress';
import Dropdown from '../Dropdown';
import styles from './index.module.scss';
import useDetectClose from '@/hooks/useDetectClose';
import { IconArrowDown } from '@/assets/icongroup';
import { useTheme } from '@/hooks/useThemeContext';

function SelectProgressDropdown({
  columnList,
  selectedValue,
  setSelectedValue,
}: {
  columnList: IColumn[];
  selectedValue: IColumn;
  setSelectedValue: any;
}) {
  // const [selectedValue, setSelectedValue] = useState<IColumn>(currentColumn[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useDetectClose(dropdownRef, false);

  const { theme } = useTheme();

  const handleOpenDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={dropdownRef}
      className={classNames(styles['select-input'], styles[theme])}
    >
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
                onClick={() => {
                  setSelectedValue(column);
                  setIsOpen(false);
                }}
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
