import useToastStore from '@/stores/toastStore';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';
import ToastItem from './ToastItem';

function ToastList() {
  const { toastList } = useToastStore();

  if (typeof document === 'undefined' || toastList.length === 0) return null; // 클라이언트에서만 실행되도록
  const element = document.getElementById('_toast');
  if (!element) return null;

  return ReactDOM.createPortal(
    <div className={styles['toast-list-wrapper']}>
      {toastList.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>,
    element,
  );
}

export default ToastList;
