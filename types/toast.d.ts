type ToastType = 'success' | 'error';

interface IToast {
  id: string;
  type: ToastType;
  message: string;
}

type ToastStoreType = {
  toastList: IToast[];
  addToastList: (toast: IToast) => void;
  removeToastList: (id: string) => void;
};
