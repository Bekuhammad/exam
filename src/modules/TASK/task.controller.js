const { taskService } = require("./task.service");
const { taskCreateDto } = require("../TASK/dto/task.create.dto");
const { validator } = require("../../lib/validator");
const { CustomError } = require("../../lib/customError");
const { ResData } = require("../../lib/resData");

class TaskController {
  #taskService;
  constructor(taskService) {
    this.#taskService = taskService;
  }

  // Get All Tasks
  async getAll(req, res, next) {
    try {
      const resData = await this.#taskService.getAll();

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // Create Task
  async create(req, res, next) {
    try {
      const dto = req.body;

      // Validate DTO
      validator(taskCreateDto, dto);

      // Create Task
      const resData = await this.#taskService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // Get Task by ID
  async getTaskById(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new CustomError(400, "Task ID is required");
      }

      const resData = await this.#taskService.getTaskById(id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // Get Tasks by User ID
  async getTasksByUserId(req, res, next) {
    try {
      const userId = req.params.userId;

      if (!userId) {
        throw new CustomError(400, "User ID is required");
      }

      const resData = await this.#taskService.getTasksByUserId(userId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // Update Task
  async update(req, res, next) {
    try {
      const dto = req.body;
      const id = req.params.id;

      if (!id) {
        throw new CustomError(400, "Task ID is required");
      }

      const resData = await this.#taskService.update(id, dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // Delete Task
  async delete(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new CustomError(400, "Task ID is required");
      }

      const resData = await this.#taskService.delete(id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

const taskController = new TaskController(taskService);

module.exports = { taskController };
