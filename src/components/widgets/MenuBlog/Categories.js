import React, { useState } from 'react';
import styles from "./categories.styles.module.scss";
import { useSelector } from 'react-redux';
import translationOfMenuBlog from './translationOfMenuBlog';
import MenuItemCard from './MenuItemCard';
import {
    menuCategories,
    drinksSubcategories,
    soupsSubcategories,
    saladsSubcategories,
    appetizerSubcategories,
    noodlesSubcategories,
    nigiriSubcategories,
    udonSubcategories,
    makiSubcategories,
    menuSubcategories
} from './MenuItemCard/menuCartItemConstants';
import {
    appetizerDescriptions,
    makiDescriptions,
    nigiriDescriptions,
    noodlesDescriptions,
    saladsDescriptions,
    soupsDescriptions,
    udonDescriptions
} from './MenuItemCard/menuSetTranslations';

const Categories = () => {
    const { params: { language } } = useSelector(state => state.generalActions);
    const [activeCategory, setActiveCategory] = useState(1);

    const handleScrollToId = (id, seq) => {
        setActiveCategory(seq);
        const section = document.getElementById(id);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const renderCategoryButtons = () => (
        <div className={styles.menuCategories}>
            {menuCategories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleScrollToId(category.id, category.seq)}
                    className={`${styles.menuCategoryButton} ${activeCategory === category.seq ? styles.active : ''}`}
                >
                    {translationOfMenuBlog[category.labelKey]?.[language] || "Başlık"}
                </button>
            ))}
        </div>
    );

    const renderMenuItems = (items, descriptions = {}) => (
        <div className={styles.menuSubCategories}>
            {items.map((item) => (
                <MenuItemCard
                    key={item.id}
                    imageSrc={item.imageUrl}
                    title={translationOfMenuBlog[item.labelKey]?.[language] || item.title}
                    price={item.price}
                    description={descriptions[item.description]?.[language] || ""}
                    ingredients={item.items}
                    quantity={item.quantity}
                    language={language}
                    porsiya={item.porsiya}
                    item={item}
                />
            ))}
        </div>
    );

    const categoryComponents = {
        1: () => renderMenuItems(menuSubcategories),
        2: () => renderMenuItems(makiSubcategories, makiDescriptions),
        3: () => renderMenuItems(udonSubcategories, udonDescriptions),
        4: () => renderMenuItems(nigiriSubcategories, nigiriDescriptions),
        5: () => renderMenuItems(noodlesSubcategories, noodlesDescriptions),
        6: () => renderMenuItems(appetizerSubcategories, appetizerDescriptions),
        7: () => renderMenuItems(saladsSubcategories, saladsDescriptions),
        8: () => renderMenuItems(soupsSubcategories, soupsDescriptions),
        9: () => renderMenuItems(drinksSubcategories)
    };

    return (
        <div>
            {renderCategoryButtons()}
            {categoryComponents[activeCategory]?.()}
        </div>
    );
};

export default Categories;