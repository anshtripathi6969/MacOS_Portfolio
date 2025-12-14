import WindowControls from '#components/WindowControls';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window.js';
import React from 'react';

const TextFile = () => {
  const { windows } = useWindowStore();
  const fileData = windows.txtfile?.data;

  // If no data, return null
  if (!fileData) return null;

  const { name, subtitle, image, description } = fileData;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="textfile-content">
        {/* Optional Image */}
        {image && (
          <div className="image-container">
            <img src={image} alt={name} />
          </div>
        )}

        {/* Optional Subtitle */}
        {subtitle && <h3 className="subtitle">{subtitle}</h3>}

        {/* Description Paragraphs */}
        {description && Array.isArray(description) && (
          <div className="description">
            {description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextFileWindow = WindowWrapper(TextFile, 'txtfile');
export default TextFileWindow;
