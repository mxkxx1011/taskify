import styles from './Chip.module.scss';

function ChipNum({ num }: { num: number }) {
  return <p className={styles['num']}>{num}</p>;
}

export default ChipNum;
