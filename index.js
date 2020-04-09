// code away!

const server = require('./server.js');

const port = process.env.PORT || 5001

server.listen(port, () => {
  console.log('\n* Server Running on http://localhost:5001 *\n');
});
