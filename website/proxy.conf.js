const fs = require('fs');
const path = require('path');

module.exports = {
  "/app/demo/demos/**": {
    target: "ddd",
    onProxyReq: function (proxyReq, req, res) {
      var reqFilePath = path.join(__dirname, 'src', req.path);
      if (fs.existsSync(reqFilePath)) {
        res.send(fs.readFileSync(reqFilePath, 'utf8'));
      }
    },
    secure: false
  }
};
