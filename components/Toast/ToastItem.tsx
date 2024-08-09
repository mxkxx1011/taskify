import styles from './index.module.scss';
import IconCheck from '@/assets/icons/ic_checked.svg';
import { IconClose } from '@/assets/icongroup';
import { ReactNode, useEffect, useState } from 'react';
import useToastStore from '@/stores/toastStore';

const DURATION = 4000;
const ANIMATION = 500;

function ToastItem({ toast }: { toast: IToast }) {
  const [visible, setVisible] = useState(true);
  const { removeToastList } = useToastStore();
  const { id, type, message } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, DURATION);

    const removeTimer = setTimeout(() => {
      removeToastList(id);
    }, DURATION + ANIMATION);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [id, removeToastList]);

  return (
    <>
      <div
        id={id}
        className={`${styles['toast']} ${styles[type]} ${
          styles[visible ? 'visible' : 'non-visible']
        }`}
      >
        <div className={styles['left-color']} />
        <div className={styles['toast-wrapper']}>
          <div className={styles['circle']}>
            {type === 'success' ? (
              <IconCheck />
            ) : (
              <IconClose width={18} height={18} />
            )}
          </div>
          <div>
            <p className={styles['title']}>
              {type === 'success' ? 'Success' : 'Failed'}
            </p>
            <p className={styles['description']}>{message}</p>
          </div>
        </div>
        <IconClose
          onClick={() => removeToastList(id)}
          width={18}
          height={18}
          className={styles['icon-close']}
        />
      </div>
    </>
  );
}

export default ToastItem;
