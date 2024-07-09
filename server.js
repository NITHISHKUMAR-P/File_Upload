const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = 3500;

app.use(express.static(path.join(__dirname)));

app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read file' });
        }
        res.json({ content: data });
    });
});

app.listen(PORT, () => {
    console.log(`Server started running at http://localhost:${PORT}`);
});
