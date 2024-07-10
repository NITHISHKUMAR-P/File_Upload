# File_Upload
## Index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Reader</title>
</head>
<body>
    <h1>File Reader</h1>
    <form id="uploadForm" enctype="multipart/form-data">
        <input type="file" id="fileInput" name="file">
        <button type="submit">Upload</button>
    </form>
    <pre id="fileContents"></pre>

    <script src="script.js"></script>
</body>
</html>
````
## Script.js:
'''js
document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    document.getElementById('fileContents').textContent = result.content;
});
'''
## Server.js:
```js
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
```
## Output:
![image](https://github.com/NITHISHKUMAR-P/File_Upload/assets/93427017/b4fcc0ed-3630-406a-af30-2bd6eb7c4dab)
