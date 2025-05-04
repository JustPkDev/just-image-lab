import React, { useRef, useState } from 'react';

const Upload = ({ setImages, all = false, setUploaded = null }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const getImageMeta = (file) => {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            const fileType = file.type.split('/')[1];
            img.onload = () => {
                resolve({
                    file,
                    w: img.width,
                    h: img.height,
                    type: fileType,
                    dw: img.width,
                    dh: img.height,
                    dtype: fileType,
                    quality: 50
                });
            };
            img.onerror = reject;
            img.src = url;
        });
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        const imagesWithMeta = await Promise.all(imageFiles.map(getImageMeta));
        if (all) {
            setImages(prev => [...prev, ...imagesWithMeta]);
        } else {
            setImages(imagesWithMeta);
        }

        if (setUploaded) {
            setUploaded(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        const imagesWithMeta = await Promise.all(imageFiles.map(getImageMeta));
        if (all) {
            setImages(prev => [...prev, ...imagesWithMeta]);
        } else {
            setImages(imagesWithMeta);
        }

        if (setUploaded) {
            setUploaded(false);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center px-3">
            <div
                className="w-[1000px] cursor-pointer h-[500px] max-sm:h-[350px] 
                           mt-16 rounded-lg border border-dotted border-[#bc5ee6] 
                           flex justify-center items-center transition-all duration-200"
                style={{
                    borderStyle: isDragging ? 'solid' : 'dotted',
                    backgroundColor: isDragging ? '#0c0e26' : 'transparent',
                }}
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
            >
                <h1 className="text-[#bc5ee6] text-[22px] font-mono text-center">
                    {isDragging ? 'Release to Upload Images' : 'Drop Images or Click Here'}
                </h1>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default Upload;