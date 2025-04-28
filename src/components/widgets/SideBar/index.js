// components/CartSidebar/CartSidebar.jsx
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import generalAllTranslations from "../../../constants/generalAllTranslations";
import { useDispatch, useSelector } from "react-redux";
import { menuCategories } from "../MenuBlog/MenuItemCard/menuCartItemConstants";
import translationOfMenuBlog from "../MenuBlog/translationOfMenuBlog";

const SideBar = () => {
  const [openCart, setOpenCart] = useState(false);
  const { params: { language }, sebet, totalPriceOfSebet } = useSelector(state => state.generalActions);
  const [additionalNote, setAdditionalNote] = useState("");
  const toggleCart = () => setOpenCart(!openCart);
  const dispatch = useDispatch();

  let quantityItemsOfAllSebebt = sebet.reduce((acc, item) => acc + item.quantityItem, 0);
  const deleteFromTheSebet = (id) => {
    dispatch({ type: 'DELETE_FROM_THE_SEBET', data: { id } });

  }
  const handleCompleteOrder = () => {
    if (sebet.length === 0) {
      alert("Sebet boş!");
      return;
    }

    const phoneNumber = "+994702027770"; // ✅ kendi numaranı koy
    let message = "Yeni Sifariş:\n\n";

    sebet.forEach((item, index) => {
      message += `${index + 1}) ${item.title} - ${item.quantityItem} ədəd - ${item.price * item.quantityItem} AZN\n`;
    });

    message += `\nÜmumi: ${totalPriceOfSebet.toFixed(2)} AZN`;

    // ✅ Eğer kullanıcı ek bir not yazdıysa mesajın sonuna ekle
    if (additionalNote.trim()) {
      message += `\n\nİlave Not:\n${additionalNote.trim()}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };


  return (
    <>
      <div className={styles.budget} onClick={toggleCart}>
        <span>{quantityItemsOfAllSebebt}</span>
        <i className="fa-solid fa-cart-shopping"></i>
      </div>

      <div className={`${styles.sidebar} ${openCart ? styles.sidebar_open : ''}`}>
        <div className={styles.sidebar_header}>
          <h2>{generalAllTranslations["strSebet"]?.[language]}</h2>
          <i className="fa-solid fa-xmark" onClick={toggleCart}></i>
        </div>

        <div className={styles.sidebar_body}>
          {sebet.map(item => {

            const matchedCategory = menuCategories.find(category => category.seq === item.mainSeq);
            const labelKey = matchedCategory?.labelKey || matchedCategory?.title;

            const categoryName = labelKey ? translationOfMenuBlog[labelKey]?.[language] : "Bilinmeyen";
            const itemName = translationOfMenuBlog[item.title]?.[language] || item.title


            return (
              <div key={item.id} className={styles.cart_item}>
                <h3>{categoryName}</h3> {/* BURASI kategori adı */}
                <div className={styles.item_info}>
                  <div className={styles.image_div}>
                    <Image src={item.imageUrl} alt={categoryName} width={65} height={65} />
                  </div>
                  <div className={styles.quantity_controls}>
                    <p className={styles.name}>{itemName}</p>
                    <div className={styles.icons_plus_minus}>
                      <FaMinus onClick={() => dispatch({ type: 'DECREASE_SEBET_ITEM', data: { id: item.id } })} />
                      <span>{item.quantityItem}</span>
                      <FaPlus onClick={() => dispatch({ type: 'INCREASE_SEBET_ITEM', data: { id: item.id } })} />
                    </div>
                  </div>
                  <div className={styles.price_info}>
                    <span className={styles.price}>{item.price.toFixed(2) * item.quantityItem} AZN</span>
                    <FaTimes onClick={() => deleteFromTheSebet(item.id)} className={styles.delete_icon} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ Kullanıcının ek not yazması için alan */}
        <div className={styles.additional_note_area}>
          <textarea
            value={additionalNote}
            onChange={(e) => setAdditionalNote(e.target.value)}
            placeholder={generalAllTranslations["strIlaveIstekler"][language]}
            rows="3"
          />
        </div>
        <div className={styles.sidebar_footer}>
          <div className={styles.price_row}>
            <span>{generalAllTranslations["strUmumi"][language]}</span>
            <span>{totalPriceOfSebet.toFixed(2)} AZN</span>
          </div>
          <div className={styles.footer_buttons}>
            <button onClick={() => dispatch({ type: "CLEAN_SEBET" })} className={styles.clear_cart}>{generalAllTranslations["strSebetiBosalt"]?.[language]}</button>
            <button onClick={() => handleCompleteOrder()} className={styles.complete_order}>{generalAllTranslations["strSifarisiTamamla"]?.[language]}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
