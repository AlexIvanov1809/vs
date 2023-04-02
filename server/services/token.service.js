const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {}
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { userId } });
    if (tokenData) {
      return await Token.update(
        { refreshToken },
        { where: { id: tokenData.id } },
      );
    }
    const token = await Token.create({ userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({ where: { refreshToken } });

    return tokenData;
  }
  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });

    return tokenData;
  }
}

module.exports = new TokenService();
