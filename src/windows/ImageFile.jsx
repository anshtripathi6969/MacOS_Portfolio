import WindowControls from '#components/WindowControls';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window.js';
import React from 'react';

const ImageFile = () => {
  const { windows } = useWindowStore();
  const fileData = windows.imgfile?.data;

  // If no data, return null
  if (!fileData) return null;

  const { name, imageUrl } = fileData;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="imagefile-content">
        {imageUrl && (
          <img src={imageUrl} alt={name} />
        )}
      </div>
    </>
  );
};

const ImageFileWindow = WindowWrapper(ImageFile, 'imgfile');
export default ImageFileWindow;
