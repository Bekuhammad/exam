const { CustomError } = require("../../lib/customError");
const { bcryptIntance } = require("../../lib/bcrypt");
const { jwtIntance } = require("../../lib/jwt");
const { ResData } = require("../../lib/resData");
const { userService } = require("../user/user.service");
const { AuthModel } = require("./entity/auth.model");



class AuthService {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }


  //...Login
  async login(dto) {
    const { data, statusCode } = await this.#userService.getByPhone(dto.phone);

    if (statusCode === 404) {
      throw new CustomError(400, "phone or password is incorrect");
    }

    const isValid = await bcryptIntance.compare(dto.password, data.password);

    if (!isValid) {
      throw new CustomError(400, "phone or password is incorrect");
    }

    const tokenData = { id: data._id };

    const accessToken = jwtIntance.generateAcctoken(tokenData);
    const refreshToken = jwtIntance.generateReftoken(tokenData);

    const resData = new ResData(200, "success", {
      user: data,
      token: { accessToken, refreshToken },
    });

    return resData;
  }

  //...Refresh
  async refresh(token) {
    const payload = jwtIntance.verifyRefToken(token);

    const { data } = await this.#userService.getUserById(payload.id);

    const accessToken = jwtIntance.generateAcctoken(payload);
    const refreshToken = jwtIntance.generateReftoken(payload);

    const resData = new ResData(200, "Tokens refreshed successfully", {
      user: data,
      token: { accessToken, refreshToken },
    });

    return resData;
  }

  // ... Register
async register(dto) {
  const { data: existingUser } = await this.#userService.getByPhone(dto.phone);

  if (existingUser) {
    throw new CustomError(400, "User with this phone already exists");
  }

  const hashedPassword = await bcryptIntance.hash(dto.password);

  const newUser = {
    ...dto,
    password: hashedPassword,
  };

  const { data: createdUser } = await this.#userService.create(newUser);

  const tokenData = { id: createdUser._id };
  const accessToken = jwtIntance.generateAcctoken(tokenData);
  const refreshToken = jwtIntance.generateReftoken(tokenData);

  const resData = new ResData(201, "User registered successfully", {
    user: createdUser,
    token: { accessToken, refreshToken },
  });

  return resData;
}

}

const authService = new AuthService(userService);

module.exports = { authService };
