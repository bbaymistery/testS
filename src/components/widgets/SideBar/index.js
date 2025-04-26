// components/CartSidebar/CartSidebar.jsx
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";

const mockCartData = {
  drinks: [
    {
      id: 1,
      name: "Rkatsiteli Ağ Kəm...",
      image: "/images/drink.png",
      price: 12.0,
      quantity: 1,
      category: "İçkilər"
    }
  ],
  sushiSets: [
    {
      id: 2,
      name: "Secret Set",
      image: "/images/sushi.png",
      price: 17.0,
      oldPrice: 23.0,
      quantity: 1,
      category: "Suşi setlər"
    }
  ]
};

const SideBar = () => {
  const [openCart, setOpenCart] = useState(false);

  const toggleCart = () => setOpenCart(!openCart);

  const cartItems = [...mockCartData.drinks, ...mockCartData.sushiSets];
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const originalPrice = cartItems.reduce((acc, item) => acc + (item.oldPrice || item.price) * item.quantity, 0);

  return (
    <>
      <div className={styles.budget} onClick={toggleCart}>
        <span>1</span>
        <i className="fa-solid fa-cart-shopping"></i>
      </div>

      <div className={`${styles.sidebar} ${openCart ? styles.sidebar_open : ''}`}>
        <div className={styles.sidebar_header}>
          <h2>Səbət</h2>
          <i className="fa-solid fa-xmark" onClick={toggleCart}></i>
        </div>

        <div className={styles.sidebar_body}>
          <div>
            <h3>İçkilər</h3>
            {mockCartData.drinks.map(item => (
              <div key={item.id} className={styles.cart_item}>
                <Image src={item.image} alt={item.name} width={50} height={50} />
                <div className={styles.item_info}>
                  <span className={styles.name}>{item.name}</span>
                  <div className={styles.quantity_controls}>
                    <FaMinus />
                    <span>{item.quantity}</span>
                    <FaPlus />
                  </div>
                </div>
                <div className={styles.price_info}>
                  <span className={styles.price}>{item.price.toFixed(2)} AZN</span>
                  <FaTimes className={styles.delete_icon} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3>Suşi setlər</h3>
            {mockCartData.sushiSets.map(item => (
              <div key={item.id} className={styles.cart_item}>
                <Image src={item.image} alt={item.name} width={50} height={50} />
                <div className={styles.item_info}>
                  <span className={styles.name}>{item.name}</span>
                  <div className={styles.quantity_controls}>
                    <FaMinus />
                    <span>{item.quantity}</span>
                    <FaPlus />
                  </div>
                </div>
                <div className={styles.price_info}>
                  <span className={styles.price}>{item.price.toFixed(2)} AZN</span>
                  <span className={styles.old_price}>{item.oldPrice?.toFixed(2)} AZN</span>
                  <FaTimes className={styles.delete_icon} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sidebar_footer}>
          <div className={styles.price_row}>
            <span>Məbləğ</span>
            <span>{originalPrice.toFixed(2)} AZN</span>
          </div>
          <div className={styles.price_row}>
            <span>Ümumi</span>
            <span>{totalPrice.toFixed(2)} AZN</span>
          </div>


          <div className={styles.footer_buttons}>
            <button className={styles.clear_cart}>Səbəti boşalt</button>
            <button className={styles.complete_order}>Sifarişi tamamla</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
