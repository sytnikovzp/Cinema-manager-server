exports.getTime = (req, res, next) => {
  req.getTime = new Date().toLocaleDateString();
  next();
};

exports.showTime = (req, res, next) => {
  console.log(`Show time: ${req.getTime} `);
  next();
};
