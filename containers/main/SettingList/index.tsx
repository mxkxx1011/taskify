import styles from './index.module.scss';

interface ISettingList {
  image: () => JSX.Element;
  title: string;
  description: string;
}
function SettingList({ list }: { list: ISettingList }) {
  const { image, title, description } = list;
  return (
    <div className={styles['list']}>
      <div className={styles['top']}>{image()}</div>
      <div className={styles['bottom']}>
        <p className={styles['title']}>{title}</p>
        <p className={styles['description']}>{description}</p>
      </div>
    </div>
  );
}

export default SettingList;
