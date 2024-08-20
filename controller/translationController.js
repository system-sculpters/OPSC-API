const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY});

const translateText = async (text, targetLanguage) => {
    try {
        const [translations] = await translate.translate(text, targetLanguage);
        console.log(`Text: ${text}`);
        console.log(`Translation: ${translations}`);
        return translations
      } catch (error) {
        console.error('Error during translation:', error);
      }
}

const reqTranslate  = (req, res) => {
    const { langCode } = req.params
    const { text } = req.body

    try {
        const result = translateText(text, langCode)
        res.status(200).json({result: result}, {message: 'successful'})
    } catch (error) {
        console.error('Error deleting Transaction:', error);
        res.status(500).json({ error: 'Failed to delete Transaction' });
    }
}

module.exports = { reqTranslate }