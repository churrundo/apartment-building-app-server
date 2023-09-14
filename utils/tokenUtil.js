const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const { _id, email, name, residence } = user;
    const payload = { 
      _id, 
      email, 
      name, 
      buildingId: residence && residence.building 
    };

    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
    });
};

module.exports = { generateToken };