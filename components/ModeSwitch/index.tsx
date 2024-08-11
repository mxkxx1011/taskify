import { useState } from 'react';
import styles from './index.module.scss';

function ModeSwitch() {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <label htmlFor='switch' className={styles['switch']}>
      <input
        onClick={() => setIsChecked((prev) => !prev)}
        id='switch'
        type='checkbox'
        checked={isChecked}
      />
      <span className={styles['slider']}></span>
      <span className={styles['decoration']}></span>
    </label>
  );
}

export default ModeSwitch;
