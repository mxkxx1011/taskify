import FixedMenu from '@/components/FixedMenu';

import { ReactNode } from 'react';
import styles from './dashboardLayout.module.scss';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles['main']}>
      <FixedMenu />
      {children}
    </div>
  );
}

export default DashboardLayout;
