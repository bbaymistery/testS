// file: constants/languages.js

const websiteLanguagesWithInnerText = [
    { innerText: "Azərbaycan", value: "az", dir: "ltr" },
    { innerText: "Русский", value: "ru", dir: "ltr" },
    { innerText: "Türkçe", value: "tr", dir: "ltr" },
    { innerText: "English", value: "en", dir: "ltr" },
    { innerText: "Español", value: "es", dir: "ltr" },
    { innerText: "Italiano", value: "it", dir: "ltr" },
    { innerText: "简体中文", value: "zh", dir: "ltr" },
];
export default websiteLanguagesWithInnerText;
// extract just the language values (like ["en", "tr", ...])
export const languages = websiteLanguagesWithInnerText.map(lang => lang.value);
