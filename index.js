const express = require('express')
const app = express()
const port = 3000

// http://localhost:3000/video/aaa-bbb-ccc/video.mp4
app.get('/video/:id/video.mp4', (req, res) => {
    
    // 1. check authorization header
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }
      
    // 2. return mp4 file as binary if passed authentication
    const file = `${__dirname}/uploads/myfile.mp4`;
    res.download(file);

})

app.listen(port, () => {
  console.log(`Video sample api listening at http://localhost:${port}`)
})