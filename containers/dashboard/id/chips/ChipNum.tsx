import { useTheme } from '@/hooks/useThemeContext';
import classNames from 'classnames';
import styles from './Chip.module.scss';

function ChipNum({ num }: { num: number }) {
  const { theme } = useTheme();

  return <p className={classNames(styles['num'], styles[theme])}>{num}</p>;
}

export default ChipNum;
