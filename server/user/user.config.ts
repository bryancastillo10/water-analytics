import { UserRepository } from "@/user/user.repository";
import { UserService } from "@/user/core/service/userService";
import { UserController } from "@/user/user.controller";

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

export const userController = new UserController(userService);