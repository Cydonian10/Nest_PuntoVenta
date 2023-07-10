import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { AuthRegisterDto } from '../dtos/auth.dto';
import { Rol } from '../database/entities/rol.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
  ) {}

  /**
   * Buscar usuario por email
   */
  findOneByDNI(dni: User['dni']): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { dni },
      relations: { roles: true },
      select: { roles: { nombre: true, descripcion: true } },
    });
  }

  /**
   * Creando un usuario
   */
  async crear(dto: AuthRegisterDto): Promise<User> {
    const roles = await this.rolRepository.findBy({
      id: In([...dto.rolIds]),
    });
    const newUser = this.userRepository.create(dto);
    newUser.roles = roles;
    return this.userRepository.save(newUser);
  }

  /**
   * Perfil de usuario
   */
  async perfil(id: User['id']) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { roles: true },
    });

    if (!user) {
      throw new BadRequestException('Id not found');
    }

    return user;
  }
}
