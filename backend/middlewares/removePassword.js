module.exports = (req, res, next) => {
  if (req.method === "GET" && req.url.startsWith("/users")) {
    const send = res.send;
    res.send = (body) => {
      let data = JSON.parse(body);
      if (Array.isArray(data)) {
        data = data.map((user) => {
          const { password, ...rest } = user;
          return rest;
        });
      } else {
        const { password, ...rest } = data;
        data = rest;
      }
      send.call(res, JSON.stringify(data));
    };
  }
  next();
};
