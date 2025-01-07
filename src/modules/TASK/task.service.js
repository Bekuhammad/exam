const { CustomError } = require("../../lib/customError");
const { ResData } = require("../../lib/resData");
const { TaskModel } = require("./entity/task.entity");

class TaskService {
  #taskRepo;
  constructor(taskRepo) {
    this.#taskRepo = taskRepo;
  }

  // Create Task
  async create(dto) {
    const data = await this.#taskRepo.create({
      title: dto.title,
      description: dto.description,
      userId: dto.userId,
      startDate: dto.startDate,
      endDate: dto.endDate,
      status: dto.status || "pending", // Default: pending
    });

    const resData = new ResData(201, "Task created successfully", data);
    return resData;
  }

  // Get Task by ID
  async getTaskById(id) {
    const data = await this.#taskRepo.findById(id);

    if (!data) {
      throw new CustomError(404, "Task not found by id");
    }

    const resData = new ResData(200, "Task fetched successfully", data);
    return resData;
  }

  // Get All Tasks
  async getAll() {
    const data = await this.#taskRepo.find();

    if (!data || data.length === 0) {
      throw new CustomError(404, "No tasks found");
    }

    const resData = new ResData(200, "Tasks fetched successfully", data);
    return resData;
  }

  // Get Tasks by User ID
  async getTasksByUserId(userId) {
    const data = await this.#taskRepo.find({ userId });

    if (!data || data.length === 0) {
      throw new CustomError(404, `No tasks found for user ID: ${userId}`);
    }

    const resData = new ResData(200, "Tasks fetched successfully", data);
    return resData;
  }

  // Update Task
  async update(id, dto) {
    const data = await this.#taskRepo.findByIdAndUpdate(
      id,
      {
        title: dto.title,
        description: dto.description,
        startDate: dto.startDate,
        endDate: dto.endDate,
        status: dto.status,
      },
      { new: true } 
    );

    if (!data) {
      throw new CustomError(404, "Task not found by id");
    }

    const resData = new ResData(200, "Task updated successfully", data);
    return resData;
  }

  // Delete Task
  async delete(id) {
    const data = await this.#taskRepo.findByIdAndDelete(id);

    if (!data) {
      throw new CustomError(404, "Task not found by id");
    }

    return new ResData(200, "Task deleted successfully", data);
  }
}

const taskService = new TaskService(TaskModel);

module.exports = { taskService };
