import { useTheme } from '@/hooks/useThemeContext';
import classNames from 'classnames';
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

  const { theme } = useTheme();

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
        styles[theme],
      )}
    >
      {visibilityAnimation && children}
    </article>
  );
}

export default Dropdown;
