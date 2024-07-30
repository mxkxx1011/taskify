import { IconCircleChip } from '@/assets/icongroup';
import styles from './Chip.module.scss';
import classNames from 'classNames';

function ChipProgress({
  title,
  color = 'violet',
}: {
  title: string;
  color?: string;
}) {
  return (
    <div className={classNames(styles['progress'], styles[color])}>
      <IconCircleChip width={6} height={6} fill={'yellow'} />
      {title}
    </div>
  );
}

export default ChipProgress;
