import styles from './Chip.module.scss';
import classNames from 'classNames';

function ChipCard({ color, content }: { color: string; content: string }) {
  return (
    <div className={classNames(styles['card'], styles[color])}>{content}</div>
  );
}

export default ChipCard;
