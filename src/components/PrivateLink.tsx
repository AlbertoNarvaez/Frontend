import { useState } from "react";

export default function PrivateLink() {
  const [imageShown, setImageShown] = useState(false);

  function privateLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setImageShown(true);
  }

  function hideImage() {
    setImageShown(false);
  }

  return (
    <div id="private-link-container">
      <div id="private-link-object">
        <div id="private-link-text">Private Link:</div>
        <a id="private-link-lost-image" href="#" onClick={privateLinkClick}>
          <img
            id="lost-img-thumb"
            src="/img/broken-image-icon.92d4496e.png"
            alt="Image not found."
          />
          <div id="private-link-url">photo_20201208_235917.jpeg</div>
        </a>
      </div>

      {imageShown && (
        <div id="private-image-container" onClick={hideImage}>
          <img
            id="private-pupa"
            src="/img/pupa-private-image.5bdbbbc6.jpg"
            alt="Pupa's private image"
          />
          <div id="image-closer">×</div>
        </div>
      )}
    </div>
  );
}
