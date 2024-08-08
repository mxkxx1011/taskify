import HeaderDashboard from '@/components/Header/HeaderDashboard';
import SideMenu from '@/components/SideMenu';
import { ReactNode } from 'react';
import styles from './dashboardLayout.module.scss';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles['main']}>
      <HeaderDashboard />
      <SideMenu />
      {children}
    </div>
  );
}

export default DashboardLayout;
