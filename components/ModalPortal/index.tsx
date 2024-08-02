import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

const BackModal = ({ onClose }: { onClose: () => void }) => {
  return <div className={styles['back-modal']} onClick={onClose}></div>;
};

function ModalPortal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  const selectedElement = document.getElementById('_modal');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';

    return () => {
      setMounted(false);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (typeof window === 'undefined') return <></>;
  if (!mounted) return <></>;

  return (
    <>
      {createPortal(
        <BackModal onClose={onClose} />,
        selectedElement as HTMLElement,
      )}
      {createPortal(children, selectedElement as HTMLElement)}
    </>
  );
}

export default ModalPortal;
