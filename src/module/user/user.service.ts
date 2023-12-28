import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity'
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private config: ConfigService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const isUserExist=await this.userRepository.findOne({
      where:{
        email:createUserDto.email
      }
    })
    if(isUserExist){
      throw  new ForbiddenException({message:'user already exist'});
    }
    const user = await this.userRepository.create(createUserDto);
    const response =await this.userRepository.save(user);
    return response;
  }

  async findAll() {

    const users=await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const isUserExist=await this.userRepository.findOne({
      where:{
        id:id
      }   
    })

    if(!isUserExist){
      throw new ForbiddenException('User not found')
    }

    return isUserExist;

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const isUserExist=await this.userRepository.findOne({
      where:{
        id:id
      }   
    })

    if(!isUserExist){
      throw new ForbiddenException('User not found')
    }
    const response =await this.userRepository.remove(isUserExist)
    return response
  }
}
