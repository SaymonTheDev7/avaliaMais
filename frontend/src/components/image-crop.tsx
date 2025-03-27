import React, { useState, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ProfileImageEditorProps {
  onImageSave: (image: string) => void;
  imageUrl: string;
  onClose: () => void;
}

const ProfileImageEditor: React.FC<ProfileImageEditorProps> = ({ onImageSave, imageUrl, onClose }) => {
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 50, height: 50, x: 0, y: 0 });
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [src, setSrc] = useState<string>(imageUrl);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (imageUrl) {
      setSrc(imageUrl); // Atualiza a imagem de origem quando a URL muda
    }
  }, [imageUrl]);

  const onImageLoaded = (img: HTMLImageElement) => {
    setImage(img);
  };

  const onChange = (newCrop: PixelCrop) => {
    setCrop(newCrop);
  };

  const onComplete = (crop: PixelCrop) => {
    setCrop(crop);
  };

  const onSaveClick = () => {
    if (image && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = crop.width;
        canvas.height = crop.height;
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );
        const croppedImage = canvas.toDataURL('image/jpeg');
        onImageSave(croppedImage);
      }
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <div className="flex justify-between mb-4">
          <h2>Editar Foto</h2>
          <button onClick={onClose} className="text-gray-500">
            X
          </button>
        </div>
        <ReactCrop
          src={src}
          crop={crop}
          onChange={onChange}
          onImageLoaded={onImageLoaded}
          onComplete={onComplete}
        />
        <button onClick={onSaveClick} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Salvar
        </button>
      </div>
    </div>
  );
};

export default ProfileImageEditor;
