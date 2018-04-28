const express = require('express');
const path = require('path');
const historyApiFallback = require('connect-history-api-fallback');


const port = process.env.PORT || 4001;

const ip = require('lodash')
  .chain(require('os').networkInterfaces())
  .values()
  .flatten()
  .find({
    family: 'IPv4',
    internal: false
  })
  .value()
  .address;
const app = express();

app.set('port', port);

app.use(historyApiFallback({
  verbose: false
}));

app.use(express.static(`${__dirname}/public`));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/public`, 'index.html'));
});

app.listen(port, () => console.log(`Listening on: https://${ip}:${port}`));
