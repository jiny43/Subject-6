// const express = require('express');
// const path = require('path');

// const app = express();
// const port = 3000; // 원하는 포트 번호로 변경 가능

// // 정적 파일 제공
// app.use('/', express.static(path.join(__dirname, 'dist')));

// // 라우트 설정
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // 서버 시작
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000; // 원하는 포트 번호로 변경 가능

const server = http.createServer((req, res) => {
  // bundle.js 파일 요청 처리
  if (req.url === '/dist/bundle.js') {
    const bundlePath = path.join(__dirname, 'dist', 'bundle.js');
    fs.readFile(bundlePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  }
  // 그 외 요청 처리
  else {
    // 다른 요청 처리 로직을 추가하세요
    // 예: HTML 파일을 제공하는 경우
    if (req.url === '/') {
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    }
    // ...
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
