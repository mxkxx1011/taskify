import styles from './Column.module.scss';
import Logo from '@/assets/logos/LogoImage.svg';
// import Empty from '@/assets/logos/EmptyYellow.svg';
import Empty from '@/assets/logos/EmptyGray.svg';

function EmptyColumn() {
  return (
    <div className={styles['empty-column']}>
      <Logo className={styles['big-logo']} />
      <Empty className={styles['empty']} />
    </div>
  );
}

export default EmptyColumn;
