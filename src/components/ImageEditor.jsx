import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FaRegSquareCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

// components
import Upload from './Upload';

const ImageEditor = ({ images, setImages }) => {
    const [isZip, setIsZip] = useState(true);
    const [selected, setSelected] = useState([]);
    const [isUpload, setIsUpload] = useState(false);
    const [sliderValue, setSliderValue] = useState(50);

    const imageChanger = (file, w, h, type, quality, filename, callBack) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);

                canvas.toBlob(blob => {
                    const convertedFile = new File([blob], filename, {
                        type: `image/${type}`
                    });
                    callBack(convertedFile);
                }, `image/${type}`, quality / 100);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const toggleSelect = (index) => {
        setSelected((prev) =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const handleRemove = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setSelected(prev => prev.filter(i => i !== index));
    };

    const handleSelectAll = () => {
        setSelected(images.map((_, index) => index));
    }

    const handleUnSelectAll = () => {
        setSelected([]);
    }

    const handleChangeFormat = e => {
        const val = e.target.value;
        const updated = [...images];
        if (val !== '') {
            selected.forEach(img => {
                updated[img].type = val;
            })
        } else {
            selected.forEach(img => {
                updated[img].type = updated[img].dtype;
            })
        }

        setImages(updated);
    }

    const handleQuality = e => {
        setSliderValue(e.target.value);
        const updated = [...images];

        selected.forEach(img => {
            updated[img].quality = parseInt(e.target.value);
        })

        setImages(updated);
    }

    const handewidth = e => {
        const val = e.target.value;
        const updated = [...images];
        if (val !== '') {
            selected.forEach(img => {
                updated[img].w = parseInt(val);
            })
        } else {
            selected.forEach(img => {
                updated[img].w = updated[img].dw;
            })
        }

        setImages(updated);
    }

    const handeheight = e => {
        const val = e.target.value;
        const updated = [...images];
        if (val !== '') {
            selected.forEach(img => {
                updated[img].h = parseInt(val);
            })
        } else {
            selected.forEach(img => {
                updated[img].h = updated[img].dh;
            })
        }

        setImages(updated);
    }

    const handlezip = e => {
        if (e.target.value === '1') {
            setIsZip(true);
        } else {
            setIsZip(false);
        }
    }

    const handleDownloadAll = async e => {
        const zip = new JSZip();

        const filePromises = images.map(img => {
            return new Promise(resolve => {
                const filename = img.file.name.split('.')[0] + `.${img.type}`;
                imageChanger(img.file, img.w, img.h, img.type, img.quality, filename, file => {
                    resolve({ name: file.name, file });
                });
            });
        });

        const processedFiles = await Promise.all(filePromises);

        if (isZip) {
            processedFiles.forEach(({ name, file }) => {
                zip.file(name, file);
            });

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "just-image-lab.zip");
            toast("Downloaded Successfully", { className: 'taost' });
        } else {
            processedFiles.forEach(({ name, file }) => {
                saveAs(file, name);
            });
            toast("Downloaded Successfully", { className: 'taost' });
        }
    };

    const handleDownloadSelected = async e => {
        const zip = new JSZip();

        if (selected.length === 0) {
            toast("No Images Selected", { className: 'taost' });
            return;
        }

        const filePromises = selected.map(index => {
            const img = images[index];
            return new Promise(resolve => {
                const filename = img.file.name.split('.')[0] + `.${img.type}`;
                imageChanger(img.file, img.w, img.h, img.type, img.quality, filename, file => {
                    resolve({ name: file.name, file });
                });
            });
        });

        const processedFiles = await Promise.all(filePromises);

        if (isZip) {
            processedFiles.forEach(({ name, file }) => {
                zip.file(name, file);
            });

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "just-image-lab.zip");
            toast("Downloaded Successfully", { className: 'taost' });
        } else {
            processedFiles.forEach(({ name, file }) => {
                saveAs(file, name);
            });
            toast("Downloaded Successfully", { className: 'taost' });
        }
    }

    return (
        <>
            {!isUpload ?
                <div className='w-full h-full min-h-screen flex justify-between items-start max-lg:flex-col mt-[110px] mb-15 gap-10 px-5 '>
                    <div className='w-[20%] max-lg:w-full max-lg:min-h-auto min-h-auto h-full bg-[#0c0e26] rounded-lg p-5 flex flex-col gap-3'>
                        <p className='text-white mb-[-6px]'>Convert (Selected) Into:</p>
                        <select className='w-full h-[40px] px-2 rounded-sm bg-[#5e0086] text-white text-[12px] hover:opacity-90'
                            onChange={handleChangeFormat}>
                            <option value="">Select Format</option>
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                            <option value="webp">WEBP</option>
                        </select>
                        <p className='text-white mb-[-6px]'>Convert (Selected) Quality:</p>
                        <div className='flex items-center gap-2'>
                            <input type="range" className='w-full hover:opacity-90' min={0} max={100} defaultValue={50}
                                onChange={handleQuality} />
                            <p className='text-white'>{sliderValue}%</p>
                        </div>
                        <p className='text-white mb-[-6px]'>Resize (Selected):</p>
                        <div className='w-full flex justify-between items-center gap-2'>
                            <input type="number" placeholder='Width' onChange={handewidth} className='w-full h-[40px] px-2 rounded-sm bg-[#5e0086] text-white text-[12px] hover:opacity-90' />
                            <input type="number" placeholder='Height' onChange={handeheight} className='w-full h-[40px] px-2 rounded-sm bg-[#5e0086] text-white text-[12px] hover:opacity-90' />
                        </div>
                        <p className='text-white mt-3 mb-[-6px]'>Setting:</p>
                        <select onChange={handlezip} className='w-full h-[40px] px-2 rounded-sm bg-[#5e0086] text-white text-[12px] hover:opacity-90'>
                            <option value="1">Zip File</option>
                            <option value="2">One By One</option>
                        </select>
                        <button className="w-full h-[40px] cursor-pointer 
                    rounded-sm bg-[#5e0086] text-white text-[12px] hover:opacity-90"
                            onClick={() => handleSelectAll()}>Select All</button>
                        <button className="w-full h-[40px] 
                    cursor-pointer rounded-sm bg-[#5e0086] text-white text-[12px] hover:opacity-90"
                            onClick={() => handleUnSelectAll()}>UnSelect All</button>
                        <button className="w-full h-[40px] 
                    cursor-pointer rounded-sm bg-[#5e0086] text-white text-[12px] hover:opacity-90"
                            onClick={() => setIsUpload(true)}>Upload More</button>
                        <p className='text-white mt-3 mb-[-6px]'>Other:</p>
                        <button className="w-full h-[40px] 
                    cursor-pointer rounded-sm bg-[#5e0086] text-white text-[12px] hover:opacity-90"
                            onClick={handleDownloadAll}>Download (All)</button>
                        <button className="w-full h-[40px] 
                    cursor-pointer rounded-sm bg-[#5e0086] text-white text-[12px] hover:opacity-90"
                            onClick={handleDownloadSelected}>Download (Selected)</button>
                    </div>
                    <div className='w-[80%] max-lg:w-full h-full text-white grid gap-4 grid-cols-1 max-lg:grid-cols-4 min-lg:grid-cols-6 
                    max-md:grid-cols-2 max-sm:grid-cols-1 '>
                        {images.map((image, index) => {
                            const isChecked = selected.includes(index);
                            return (
                                <div
                                    key={index}
                                    data-id={index}
                                    id="card"
                                    className="relative rounded-lg border-2 border-white aspect-[3/3] group overflow-hidden"
                                >
                                    <FaRegSquareCheck
                                        size={30}
                                        color="#5e0086"
                                        className={`absolute left-1 top-1 z-10 ${isChecked ? 'block' : 'hidden'}`}
                                    />
                                    <p className='absolute right-1 top-1 z-10 text-purple-900 font-bold'>{image.type}</p>
                                    <p className='absolute right-1 bottom-1 z-10 text-purple-900 font-bold'>{image.w} / {image.h}</p>
                                    <img src={URL.createObjectURL(image.file)} alt="img" className="w-full h-full rounded-lg object-cover" />
                                    <div className="absolute top-0 left-0 w-full h-full bg-[#00000052] hidden group-hover:flex flex-col justify-center items-center gap-2">
                                        <button
                                            className="w-[100px] h-[30px] hover:opacity-90 cursor-pointer rounded-lg bg-[#5e0086] text-white text-[12px]"
                                            onClick={() => toggleSelect(index)}
                                        >
                                            {isChecked ? 'Unselect' : 'Select'}
                                        </button>
                                        <button className="w-[100px] h-[30px] hover:opacity-90 cursor-pointer rounded-lg bg-red-600 text-white text-[12px]"
                                            onClick={() => handleRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div> :
                <div className='w-full h-screen'>
                    <button className='absolute top-[90px] left-10 z-10 cursor-pointer'
                        onClick={() => setIsUpload(false)}>
                        <IoClose size={30} color='white' />
                    </button>
                    <Upload setImages={setImages} all={true} setUploaded={setIsUpload} />
                </div>
            }
            <ToastContainer />
        </>
    );
}

export default ImageEditor