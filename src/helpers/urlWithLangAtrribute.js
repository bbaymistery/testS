//checking if url exist tr es en
export const urlWithLangAtribute = (params = {}) => {
    // will check if lang exist in url
    const languageRegex = /^\/[a-z]{2}\//


    let { languages = [], previousUrl = "", nextUrl, currentUrl } = params


    let previousUrls = []
    if (previousUrl === 'tohome') {
        previousUrls = languages.map((lang) => `/${lang.value === 'en' ? "" : lang.value}`)
    } else {
        previousUrls = languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${previousUrl?.replace(languageRegex, '/')}`)
    }

    let nexturls = []
    nexturls = languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${nextUrl}`)

    let currentUrls = []
    currentUrls = languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${currentUrl?.replace(languageRegex, '/')}`)

    return {
        nexturls,
        previousUrls,
        currentUrls
    }
};
