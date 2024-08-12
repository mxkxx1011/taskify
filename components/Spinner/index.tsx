import { useTheme } from '@/hooks/useThemeContext';
import classNames from 'classnames';
import styles from './index.module.scss';

function Spinner() {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles['wrapper'], styles[theme])}>
      <div className={classNames(styles['circle'], styles[theme])}></div>
      <div className={classNames(styles['circle'], styles[theme])}></div>
      <div className={classNames(styles['circle'], styles[theme])}></div>
      <div className={classNames(styles['shadow'], styles[theme])}></div>
      <div className={classNames(styles['shadow'], styles[theme])}></div>
      <div className={classNames(styles['shadow'], styles[theme])}></div>
    </div>
  );
}

export default Spinner;
