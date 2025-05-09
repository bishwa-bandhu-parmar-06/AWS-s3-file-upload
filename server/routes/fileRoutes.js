const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { uploadFile, getFiles } = require('../controllers/fileController');

router.post('/upload', upload.single('file'), uploadFile);
router.get('/files', getFiles);

module.exports = router;
