import { useTheme } from '@/hooks/useThemeContext';
import classNames from 'classnames';
import styles from './index.module.scss';

interface ISettingList {
  image: () => JSX.Element;
  title: string;
  description: string;
}
function SettingList({ list }: { list: ISettingList }) {
  const { image, title, description } = list;
  const { theme } = useTheme();

  return (
    <div className={classNames(styles['list'], styles[theme])}>
      <div className={styles['top']}>{image()}</div>
      <div className={styles['bottom']}>
        <p className={styles['title']}>{title}</p>
        <p className={styles['description']}>{description}</p>
      </div>
    </div>
  );
}

export default SettingList;
