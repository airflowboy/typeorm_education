import { Controller, Get, NotFoundException, Param, Patch, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import UserModel from "./entity/user.entity";
import { Repository } from "typeorm";

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  @Post('users')
  postUser() {
    return this.userRepository.save({
      // title: 'test title',
    });
  }

  @Get('users')
  getUser() {
    return this.userRepository.find();
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      }
    })
    if(!user) throw new NotFoundException("User does not exist");
    return this.userRepository.save({
      ...user,
      title: user.title + '0',
    });
  }
}
