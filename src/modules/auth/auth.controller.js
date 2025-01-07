const { authService } = require("./auth.service");
const { LoginDto } = require("./dto/auth.login.dto");
const { validator } = require("../../lib/validator");
const { CustomError } = require("../../lib/customError");
class AuthController {
  #authService;
  constructor(authService) {
    this.#authService = authService;
  }


  // ... Login
  async login(req, res, next) {
    try {
      const dto = req.body;

      validator(LoginDto, dto);

      const resData = await this.#authService.login(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }


  //...Refresh
  async refresh(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new CustomError(400, "Refresh token is required");
      }

      const [type, tokenValue] = token.split(" ");

      if (type !== "Bearer" || !tokenValue) {
        throw new CustomError(400, "Invalid token type");
      }

      const resData = await authService.refresh(tokenValue);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      error.statusCode = 401;
      next(error);
    }
  }

  // ... REGISTER
  async register(req, res, next) {
    try {
      const dto = req.body;

      validator(authCreateDto, dto);

      const userExists = await this.#authService.checkIfUserExists(dto.email);
      if (userExists) {
        throw new CustomError(400, "User already exists");
      }

      const hashedPassword = await bcryptIntance.hash(dto.password);

      const resData = await this.#authService.register({ ...dto, password: hashedPassword });

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }





}

const authController = new AuthController(authService);

module.exports = { authController };
