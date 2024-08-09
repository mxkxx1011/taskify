// src/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';
import { User } from '@/types/User.interface';

interface SignInResponse {
  user: {
    nickname: string;
    id: number;
    email: string; // 추가
    profileImageUrl?: string | null; // 추가
    createdAt?: string; // 추가
    updatedAt?: string; // 추가
  };
  accessToken: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

const signIn = async (
  credentials: SignInCredentials,
): Promise<SignInResponse> => {
  const response = await fetch(
    'https://sp-taskify-api.vercel.app/7-6/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    },
  );

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data: SignInResponse = await response.json();
  // 로그인 성공 시 유저 데이터를 Zustand에 저장 & 로컬 스토리지에 토큰 저장
  localStorage.setItem('accessToken', data.accessToken);

  return data;
};

export const useSignIn = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);
  const setError = useUserStore((state) => state.setError);

  return useMutation<SignInResponse, Error, SignInCredentials>({
    mutationFn: signIn,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      // 변환 작업 추가
      const user: User = {
        ...data.user,
        createdAt: data.user.createdAt || '',
        updatedAt: data.user.updatedAt || '',
      };
      document.cookie = `token=${data.accessToken}`;
      setUser(user, data.accessToken);
      setLoading(false);
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);
    },
  });
};
