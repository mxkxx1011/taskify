import Image from 'next/image';
import {
  ChangeEvent,
  MouseEventHandler,
  useRef,
  useState,
  useEffect,
} from 'react';
import styles from './ImageInput.module.scss';
import { IconClose, IconEdit, IconAddChip } from '@/assets/icongroup';
import { useTheme } from '@/hooks/useThemeContext';

interface ImageInputProps {
  name: string;
  value: string | null;
  onChange: (f: File) => void;
  onDeleteClick: () => void;
}

export default function ImageInput({
  name,
  value,
  onChange,
  onDeleteClick,
}: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempImage, setTempImage] = useState<string | null>(value || '');
  const { theme } = useTheme();

  useEffect(() => {
    // Update tempImage when value changes
    setTempImage(value || '');
  }, [value]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files === null || !files[0]) return;
    onChange(files[0]);
    setTempImage(URL.createObjectURL(files[0]));
  };

  const handleImageDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!inputRef.current) return;
    e.preventDefault();

    const inputNode = inputRef.current as HTMLInputElement;
    inputNode.value = '';
    onDeleteClick();
    setTempImage(null); // Set to null to remove image
  };

  return (
    <div className={`${styles[`size`]} ${styles[theme]}`}>
      {tempImage ? (
        <label htmlFor={name} className={styles[`label-input`]}>
          <Image
            src={tempImage}
            alt='이미지'
            fill
            style={{ objectFit: 'cover' }}
            className={styles[`tempImage`]}
          />
          <button
            className={styles[`button`]}
            type='button'
            onClick={handleImageDelete}
          >
            <IconClose fill />
          </button>
          <IconEdit className={styles[`edit`]} />
        </label>
      ) : (
        <label htmlFor={name} className={styles[`plus`]}>
          <div className={styles[`plus-image`]}>
            <IconAddChip fill />
          </div>
        </label>
      )}

      <input
        className={styles['hidden']}
        id={name}
        type='file'
        accept='image/jpeg, image/png'
        onChange={handleImageChange}
        ref={inputRef}
      />
    </div>
  );
}
