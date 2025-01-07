const { CustomError } = require("../../lib/customError");
const { ResData } = require("../../lib/resData");
const { UserModel } = require("./entity/user.entity");

class UserService {
  #userRepo;
  constructor(userRepo) {
    this.#userRepo = userRepo;
  }

  // create

  async create(dto) {
    const data = await this.#userRepo.create({
      fullname: dto.fullname,
      phone: dto.phone,
      password: dto.password,
      role: dto.role,
    });

    const resData = new ResData(201, "User created successfully", data);
    return resData;
  }

  async getByPhone(phone) {
    const data = await this.#userRepo.findOne({ phone });

    const resData = new ResData(200, "User fetched successfully", data);

    if (!data) {
      resData.statusCode = 404;
      resData.message = "User not found by phone";
    }

    return resData;
  }

  // getById

  async getUserById(id) {
    const data = await this.#userRepo.findById(id);

    if (!data) {
      throw new CustomError(404, "User not found by id");
    }

    const resData = new ResData(200, "User fetched successfully", data);
    return resData;
  }

  // getAll

  async getAll() {
    const data = await this.#userRepo.find();

    if (!data) {
      throw new CustomError(404, "User not found");
    }

    const resData = new ResData(200, "success", data);

    return resData;
  }
  //update

  async update(id, dto) {
    const data = await this.#userRepo.findByIdAndUpdate(
      id,
      { fullname: dto.fullname, password: dto.password, phone: dto.phone },
      { new: true }
    );

    if (!data) {
      throw new CustomError(404, "User not found by id");
    }
    const resData = new ResData(200, "update successfully", data);

    return resData;
  }

  // delete
  async delete(id) {
    const data = await this.#userRepo.findByIdAndDelete(id);

    if (!data) {
      throw new CustomError(404, "Product not found");
    }

    return new ResData(200, "deleted", data);
  }
}

const userService = new UserService(UserModel);

module.exports = { userService };
