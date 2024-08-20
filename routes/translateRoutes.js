const router = require('express').Router()
const { reqTranslate } = require('../controller/translationController')

router.post('/:langCode/translate', reqTranslate)

module.exports = router