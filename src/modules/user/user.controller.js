const { userService } = require("./user.service");
const { userCreateDto } = require("../user/dto/user.create.dto");
const { validator } = require("../../lib/validator");
const { CustomError } = require("../../lib/customError");
const { bcryptIntance } = require("../../lib/bcrypt");
const { ResData } = require("../../lib/resData");

class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  //getAll

  async getAll(req, res, next) {
    try {
      const resdata = await this.#userService.getAll();

      res.status(resdata.statusCode).json(resdata);
    } catch (error) {
      next(error);
    }
  }

  // create

  async create(req, res, next) {
    try {
      const dto = req.body;

      validator(userCreateDto, dto);

      const { statusCode } = await this.#userService.getByPhone(dto.phone);

      if (statusCode === 200) {
        throw new CustomError(400, "User already exists");
      }

      const hash = await bcryptIntance.hash(dto.password);

      dto.password = hash;

      const resData = await this.#userService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // getById

  async getUserById(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new CustomError(400, "id is required");
      }

      const resData = await this.#userService.getUserById(id);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // update
  async update(req, res, next) {
    try {
      const dto = req.body;
      const id = req.params.id;
      const resData = await this.#userService.update(id, dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // delete
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const resData = await this.#userService.delete(id);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController(userService);

module.exports = { userController };
