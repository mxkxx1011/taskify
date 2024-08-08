import DashboardId from '@/containers/dashboard/id/DashboardId';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function DashboardIdPage() {
  const { user, loading } = useUserStore();
  const [mounted, setMounted] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/');
    }
  }, [mounted, user]);

  return <DashboardId />;
}

export default DashboardIdPage;
