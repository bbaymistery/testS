import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import sliderTranslations from './translations';
import { useSelector } from 'react-redux';

// Slider'da gösterilecek görseller ve başlıklar
const images = [
    {
        id: 1,
        src: '/sliderCarImages/panda1.png',
        title: "strSliderTitle1",
        subtitle: "strSliderSubtitle1",
        description: "strSliderDescription1",
        hasDescription: true,
    },
];

const ImageSlider = () => {
    // Aktif olan görselin index'i
    const [activeIndex, setActiveIndex] = useState(0);
    const { params: { language, } } = useSelector(state => state.generalActions)

    // 5 saniyede bir resmi değiştir
    useEffect(() => {
        const interval = setInterval(() => {
            // setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // 5 saniyede bir geçiş

        return () => clearInterval(interval); // Komponent unmount olunca temizle
    }, []);

    return (
        <div className={styles.sliderContainer}>
            {/* Ana büyük görsel alanı */}
            <div className={styles.mainImage}>
                {images.map((img, index) => (
                    <div
                        key={img.id}
                        className={`${styles.imageWrapper} ${index === activeIndex ? styles.active : ''}`}
                    >
                        {/* Resim bileşeni (Next.js optimize edilmiş) */}
                        <Image
                            src={img.src}
                            alt={img.title}
                            layout="fill"
                            objectFit="cover"
                            priority={index === activeIndex}
                        />
                        {/* Resmin üzerindeki yazı sadece aktif slide'da görünür */}
                        {index === activeIndex && img.hasDescription && (
                            <div className={styles.overlay}>
                                <div className={styles.overlayText}>
                                    {sliderTranslations[img?.title]?.[language]}
                                </div>
                                <div className={styles.overlayText2}>
                                    <p>{sliderTranslations[img?.subtitle]?.[language]}</p>
                                    <p>{sliderTranslations[img?.description]?.[language]}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Alt kısmındaki küçük thumbnail'lar */}
            <div className={styles.thumbnails}>
                {images.map((img, index) => (
                    <div
                        key={img.id}
                        className={`${styles.thumbnail} ${index === activeIndex ? styles.active : ''}`}
                        onClick={() => setActiveIndex(index)} // Tıklayınca o index'e geçiş yap
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
