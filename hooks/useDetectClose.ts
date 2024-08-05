import { useEffect, useState } from 'react';

const useDetectClose = (elem: any, initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (elem.current !== null && !elem.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpen, elem]);
  return { isOpen, setIsOpen };
};

export default useDetectClose;
