import styles from './index.module.scss';
import { modalValues } from '@/constants/ModalConstant';
import { useEffect } from 'react';
import classNames from 'classnames';

function SmallModal({
  type,
  handleLeftBtnClick,
  handleRightBtnClick,
}: {
  type: ModalType;
  handleLeftBtnClick: any; // 타입 any는 나중에 수정 예정
  handleRightBtnClick: any;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // input과 form 수정 예정입니다
  return (
    <div className={classNames(styles['modal'], styles['default'])}>
      <div>
        <p className={styles['title']}>{modalValues[type].title}</p>
      </div>
      <div className={styles['input-wrapper']}>
        <label>{modalValues[type].label}</label>
        <input type='text' placeholder={modalValues[type].placeholder} />
      </div>
      <div className={styles['button-wrapper']}>
        {/* 버튼 컴포넌트에 없어서 직접 작성 */}
        <button className={styles['left-btn']} onClick={handleLeftBtnClick}>
          {modalValues[type].leftBtn}
        </button>
        <button className={styles['right-btn']} onClick={handleRightBtnClick}>
          {modalValues[type].rightBtn}
        </button>
      </div>
    </div>
  );
}

export default SmallModal;
