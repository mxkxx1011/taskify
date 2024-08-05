import classNames from 'classNames';
import { ReactNode, useEffect, useState } from 'react';
import styles from './Dropdown.module.scss';

function Dropdown({
  children,
  visibility,
}: {
  children: ReactNode;
  visibility: boolean;
}) {
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);
  const [repeat, setRepeat] = useState<any>();

  useEffect(() => {
    if (visibility) {
      clearTimeout(repeat);
      setRepeat(undefined);
      setVisibilityAnimation(true);
    } else {
      setRepeat(
        setTimeout(() => {
          setVisibilityAnimation(false);
        }, 400),
      );
    }
  }, [visibility]);

  return (
    <article
      className={classNames(
        styles['dropdown'],
        visibility ? styles['fade-in'] : styles['fade-out'],
      )}
    >
      {visibilityAnimation && children}
    </article>
  );
}

export default Dropdown;
