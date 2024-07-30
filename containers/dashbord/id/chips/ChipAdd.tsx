import styles from './Chip.module.scss';
import { IconAddChip } from '@/assets/icongroup';

function ChipAdd() {
  return (
    <p className={styles['add']}>
      <IconAddChip />
    </p>
  );
}

export default ChipAdd;
