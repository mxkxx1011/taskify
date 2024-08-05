import styles from './KebabDropdown.module.scss';

export default function KebabDropdown() {
  return (
    <ul className={styles['container']}>
      <li className={styles['list']}>수정하기</li>
      <li className={styles['list']}>삭제하기</li>
    </ul>
  );
}
