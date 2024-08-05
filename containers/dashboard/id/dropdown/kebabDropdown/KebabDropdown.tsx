import Dropdown from '../Dropdown';
import styles from './KebabDropdown.module.scss';

export default function KebabDropdown({ isOpen }: { isOpen: boolean }) {
  return (
    <Dropdown visibility={isOpen}>
      <ul className={styles['container']}>
        <li className={styles['list']}>수정하기</li>
        <li className={styles['list']}>삭제하기</li>
      </ul>
    </Dropdown>
  );
}
