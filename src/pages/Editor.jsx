import React, { useEffect, useState } from "react";

// components
import Header from "../components/Header";
import Upload from "../components/Upload";
import ImageEditor from "../components/ImageEditor";
import Footer from "../components/Footer";

const Editor = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    document.title = "Just Image Lab - Editor";
  }, [images]);

  return (
    <>
      <Header />
      {images.length === 0 ? <Upload setImages={setImages} /> : <ImageEditor images={images} setImages={setImages} />}
      <Footer />
    </>
  );
};

export default Editor;
