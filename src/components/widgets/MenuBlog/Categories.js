import React, { useState } from 'react'
import styles from "./categories.styles.module.scss"
import { useSelector } from 'react-redux';
import translationOfMenuBlog from './translationOfMenuBlog';
import MenuItemCard from './MenuItemCard'; // bunu ekledik
import { appetizerSubcategories, drinksSubcategories, makiSubcategories, menuCategories, menuSubcategories, nigiriSubcategories, noodlesSubcategories, saladsSubcategories, soupsSubcategories, udonSubcategories } from './MenuItemCard/menuCartItemConstants';
import { appetizerDescriptions, makiDescriptions, menuSetTranslations, nigiriDescriptions, noodlesDescriptions, saladsDescriptions, soupsDescriptions, udonDescriptions } from './MenuItemCard/menuSetTranslations';





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
            {activeCategory === 9&& (
                <div className={styles.menuSubCategories}>
                    {drinksSubcategories.map((item) => {
                        return (
                            <MenuItemCard
                                key={item.id}
                                imageSrc={item.imageUrl}
                                title={translationOfMenuBlog[item.labelKey]?.[language] || item.title}
                                price={item.price}
                                description={false}
                                ingredients={item.items}
                                quantity={item.quantity}
                                language={language}
                                porsiya={item.porsiya}
                            />
                        )
                    }
                    )}
                </div>
            )}
            {activeCategory === 8&& (
                <div className={styles.menuSubCategories}>
                    {soupsSubcategories.map((item) => {
                        return (
                            <MenuItemCard
                                key={item.id}
                                imageSrc={item.imageUrl}
                                title={translationOfMenuBlog[item.labelKey]?.[language] || item.title}
                                price={item.price}
                                description={soupsDescriptions[item.description]?.[language] || ""}
                                ingredients={item.items}
                                quantity={item.quantity}
                                language={language}
                                porsiya={item.porsiya}
                            />
                        )
                    }
                    )}
                </div>
            )}
      {activeCategory ===7&& (
                <div className={styles.menuSubCategories}>
                    {saladsSubcategories.map((item) => {
                        return (
                            <MenuItemCard
                                key={item.id}
                                imageSrc={item.imageUrl}
                                title={translationOfMenuBlog[item.labelKey]?.[language] || item.title}
                                price={item.price}
                                description={saladsDescriptions[item.description]?.[language] || ""}
                                ingredients={item.items}
                                quantity={item.quantity}
                                language={language}
                                porsiya={item.porsiya}
                            />
                        )
                    }
                    )}
                </div>
            )}
            {activeCategory === 6&& (
                <div className={styles.menuSubCategories}>
                    {appetizerSubcategories.map((item) => {
                        return (
                            <MenuItemCard
                                key={item.id}
                                imageSrc={item.imageUrl}
                                title={translationOfMenuBlog[item.labelKey]?.[language] || item.title}
                                price={item.price}
                                description={appetizerDescriptions[item.description]?.[language] || ""}
                                ingredients={item.items}
                                quantity={item.quantity}
                                language={language}
                                porsiya={item.porsiya}
                            />
                        )
                    }
                    )}
                </div>
            )}
            {activeCategory === 5 && (
                <div className={styles.menuSubCategories}>
                    {noodlesSubcategories.map((item) => {
                        return (
                            <MenuItemCard
                                key={item.id}
                                imageSrc={item.imageUrl}
                                title={translationOfMenuBlog[item.labelKey]?.[language] || item.title}
                                price={item.price}
                                description={noodlesDescriptions[item.description]?.[language] || ""}
                                ingredients={item.items}
                                quantity={item.quantity}
                                language={language}
                                porsiya={item.porsiya}
                            />
                        )
                    }
                    )}
                </div>
            )}

            {activeCategory === 4 && (
                <div className={styles.menuSubCategories}>
                    {nigiriSubcategories.map((item) => {
                        return (
                            <MenuItemCard
                                key={item.id}
                                imageSrc={item.imageUrl}
                                title={translationOfMenuBlog[item.labelKey]?.[language] || item.title}
                                price={item.price}
                                description={nigiriDescriptions[item.description]?.[language] || ""}
                                ingredients={item.items}
                                quantity={item.quantity}
                                language={language}
                                porsiya={item.porsiya}
                            />
                        )
                    }
                    )}
                </div>
            )}
            {activeCategory === 3 && (
                <div className={styles.menuSubCategories}>
                    {udonSubcategories.map((item) => {
                        return (
                            <MenuItemCard
                                key={item.id}
                                imageSrc={item.imageUrl}
                                title={translationOfMenuBlog[item.labelKey]?.[language] || item.title}
                                price={item.price}
                                description={udonDescriptions[item.description]?.[language] || ""}
                                ingredients={item.items}
                                quantity={item.quantity}
                                language={language}
                                porsiya={item.porsiya}
                            />
                        )
                    }
                    )}
                </div>
            )}
            {activeCategory === 2 && (
                <div className={styles.menuSubCategories}>
                    {makiSubcategories.map((item) => {
                        return (
                            <MenuItemCard
                                key={item.id}
                                imageSrc={item.imageUrl}
                                title={translationOfMenuBlog[item.labelKey]?.[language] || item.title}
                                description={makiDescriptions[item.description]?.[language] || ""}
                                price={item.price}
                                ingredients={item.items}
                                quantity={item.quantity}
                                language={language}
                            />
                        )
                    }
                    )}
                </div>
            )}

            {activeCategory === 1 && (
                <div className={styles.menuSubCategories}>
                    {menuSubcategories.map((item) => {
                        return (
                            <MenuItemCard
                                key={item.id}
                                imageSrc={item.imageUrl}
                                title={translationOfMenuBlog[item.labelKey]?.[language] || item.title}
                                description={false}
                                price={item.price}
                                ingredients={item.items}
                                quantity={false}
                                language={language}
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
