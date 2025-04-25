import { useSelector } from "react-redux";
import GlobalLayout from "../../components/layouts/GlobalLayout";
import styles from "./styles.module.scss"
import DangerouslyInnerHtml from "../../components/elements/DangerouslyInnerHtml";
import aboutContentByLang from "./aboutContentByLang";

const AboutUs = () => {

    const { params: { language, } } = useSelector(state => state.generalActions)

    return (
        <GlobalLayout >
            <div className={`page ${styles.about_page}`}>
                <div className={`page_section ${styles.about_page_section}`} >
                    <div className={`page_section_container ${styles.about_page_section_container}`}>
                        <DangerouslyInnerHtml htmlContent={aboutContentByLang[language] || aboutContentByLang["az"]} />
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default AboutUs;
