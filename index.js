const express = require('express');
var mime = require('mime-types');
var path = require('path');
var fs = require('fs');
const app = express()
const port = 3000

// http://localhost:3000/video/aaa-bbb-ccc/video.mp4
// http://192.168.2.15/video/aaa-bbb-ccc/video.mp4
// http://p1.api.redspacedec.com:3000/api/v1/alerts/video/ALR-1615477021257-865769/video.mp4
app.get('/video/:id/video.mp4', (req, res) => {
    
    // 1. check authorization header
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }
    console.log(req.headers);
      
    // 2. return mp4 file as binary if passed authentication
    const file = `${__dirname}/uploads/myfile.mp4`;
    res.download(file);

});

app.get('/api/v1/alerts/video/ALR-1615477021257-865769/video.mp4', (req, res) => {
  console.log(req.headers);

  const filename = `${__dirname}/uploads/myfile.mp4`;

  const mimeType = mime.contentType(path.extname(filename));
  const stat = fs.statSync(filename);
  // read file sync so we don't hold open the file creating a race with
  // the builder (Windows does not allow us to delete while the file is open).
  buffer = fs.readFileSync(filename);

  if (req.headers.range) {
    const range = req.headers.range;
    console.log({range});
    //const total = content.length;
    const total = stat.size;
    const [partialstart, partialend] = range.replace(/bytes=/, "").split("-");

    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : total;
    const chunksize = end - start;

    res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Length', chunksize);
    res.setHeader('Content-Type', mimeType);
    res.writeHead(206);
    console.log('res:',res.getHeaders());
    res.end(buffer.slice(start, end));
    return;
  } else {
    res.setHeader('Cache-Control', 'private, max-age=0, must-revalidate');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', mimeType);
    res.writeHead(200);
    console.log('res:',res.getHeaders());
    res.end(buffer);
  }




return;


  // 1. check authorization header
  // if (!req.headers.authorization) {
  //     return res.status(403).json({ error: 'No credentials sent!' });
  // }

    res.setHeader('Accept-Ranges','none');
  // 2. return mp4 file as binary if passed authentication
  const file = `${__dirname}/uploads/myfile2.mp4`;
  res.download(file);

});



app.listen(port, () => {
  console.log(`Video sample api listening at http://localhost:${port}`)
})