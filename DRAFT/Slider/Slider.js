import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./Slider.module.scss";

import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { slideImages } from "../../../constants/slideImages";

const Slider = () => {
  //https://www.youtube.com/watch?v=tphDji-XZCE
  const [index, setIndex] = React.useState(0);
  const [cars, setCars] = React.useState(slideImages);
  useEffect(() => {
    const lastIndex = cars.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > cars.length - 1) {
          index = 0;
        }
        return index;
      });
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index, cars]);

  return (
    <div className={styles.slider_container}>
      <div className={styles.slider + " " + "sliderrr"}>
        {slideImages.map((image, carIndex) => {
          let position = "nextSlide";
          if (carIndex === index) {
            position = "activeSlide";
          }
          if (
            carIndex === index - 1 ||
            (index === 0 && carIndex === cars.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <div
              className={styles.slide + " " + position + " " + "eachslider"}
              key={image.id}
            >
              <Image
                src={image.img}
                layout="fill"
             
                alt="Logo"
              />
              <div className={styles.container_auto_center}>
                <div className={styles.intro}>
                  <h2 className={styles.intro_welcome}>Welcome to limorex</h2>
                  <h1 className={styles.intro_header}>
                    Drive the car <br /> you ever dream
                  </h1>
                  <p className={styles.intro_desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Earum molestiae ea atque sunt, asperiores illo.
                  </p>
                  <div className={styles.login_register}>
                    <button className={styles.login_register_button}>
                      View Our Fleet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className={styles.navigation}>
          <AiOutlineLeft
            className={styles.prev_btn}
            onClick={() => setIndex(index - 1)}
          />
          <AiOutlineRight
            className={styles.next_btn}
            onClick={() => setIndex(index + 1)}
          />
        </div>

        {/* //!clickable navigations */}
        <div className={styles.visibility_navigation}>
          <div
            className={
              styles.slide_icon +
              " " +
              `${index === 0 ? "activeNavigationSlider" : ""}`
            }
            onClick={() => setIndex(0)}
          ></div>
          <div
            className={
              styles.slide_icon +
              " " +
              `${index === 1 ? "activeNavigationSlider" : ""}`
            }
            onClick={() => setIndex(1)}
          ></div>
          <div
            className={
              styles.slide_icon +
              " " +
              `${index === 2 ? "activeNavigationSlider" : ""}`
            }
            onClick={() => setIndex(2)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
/**
 *
 * import Imagee from "../../images/sliderCarImages/o.avif";
import Imagee2 from "../../images/sliderCarImages/p.avif";
import Imagee3 from "../../images/sliderCarImages/pd.avif";
 *    <div className={styles.slide}>
          <Image
            src={Imagee2}
            // layout="fill"
            width="100%"
            height="100%"
            layout="fill"
            objectFit="cover"
            alt="Logo"
            className={styles.slide_img}
          />
          <div className={styles.container_auto_center}>
            <div className={styles.intro}>
              <h2 className={styles.intro_welcome}>Welcome to limorex</h2>
              <h1 className={styles.intro_header}>
                Drive the car <br /> you ever dream
              </h1>
              <p className={styles.intro_desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                molestiae ea atque sunt, asperiores illo.
              </p>
              <div className={styles.login_register}>
                <button className={styles.login_register_button}>
                  View Our Fleet
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.slide}>
          <Image
            src={Imagee3}
            // layout="fill"
            width="100%"
            height="100%"
            layout="fill"
            objectFit="cover"
            alt="Logo"
            className={styles.slide_img}
          />
          <div className={styles.container_auto_center}>
            <div className={styles.intro}>
              <h2 className={styles.intro_welcome}>Welcome to limorex</h2>
              <h1 className={styles.intro_header}>
                Drive the car <br /> you ever dream
              </h1>
              <p className={styles.intro_desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                molestiae ea atque sunt, asperiores illo.
              </p>
              <div className={styles.login_register}>
                <button className={styles.login_register_button}>
                  View Our Fleet
                </button>
              </div>
            </div>
          </div>
        </div>
 */
