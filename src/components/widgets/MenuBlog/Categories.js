import React, { useState } from 'react'
import styles from "./categories.styles.module.scss"
import { useSelector } from 'react-redux';
import translationOfMenuBlog from './translationOfMenuBlog';
import MenuItemCard from './MenuItemCard'; // bunu ekledik
import { menuCategories, menuSubcategories } from './MenuItemCard/menuCartItemConstants';
import { menuSetTranslations } from './MenuItemCard/menuSetTranslations';





const Categories = () => {
    const { params: { language } } = useSelector(state => state.generalActions);

    const [activeCategory, setActiveCategory] = useState(1); // Başlangıçta seq:1 aktif

    const handleScrollToId = (id, seq) => {
        setActiveCategory(seq); // Tıklananın seq numarasını aktif yap
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div>
            <div className={styles.menuCategories}>
                {menuCategories.map((category) => (
                    <button key={category.id} onClick={() => handleScrollToId(category.id, category.seq)} className={`${styles.menuCategoryButton} ${activeCategory === category.seq ? styles.active : ''}`}  >
                        {translationOfMenuBlog[category.labelKey]?.[language] || "Başlık"}
                    </button>
                ))}
            </div>

            {/* Eğer aktif kategori 1 ise alt kartları göster */}
            {activeCategory === 1 && (
                <div className={styles.menuSubCategories}>
                    {menuSubcategories.map((item) => {

                        return (
                            <MenuItemCard
                                key={item.id}
                                imageSrc={item.imageUrl}
                                title={translationOfMenuBlog[item.labelKey]?.[language] || "Title"}
                                description={menuSetTranslations[item.description]?.[language]}
                                price={item.price}
                            />
                        )
                    }

                    )}
                </div>
            )}
        </div>
    )
}

export default Categories;
