import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '@/entities/user.entity';
import { AuthRegisterDto } from '../dtos/auth.dto';
import { Rol } from '@/entities/rol.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsuarioEntity) private userRepository: Repository<UsuarioEntity>,
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
  ) {}

  /**
   * Buscar usuario por email
   */
  findOneByDNI(dni: UsuarioEntity['dni']): Promise<UsuarioEntity | undefined> {
    return this.userRepository.findOne({
      where: { dni },
      relations: { roles: true },
      select: { roles: { nombre: true, descripcion: true } },
    });
  }

  /**
   * Creando un usuario
   */
  async crear(dto: AuthRegisterDto): Promise<UsuarioEntity> {
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
  async perfil(id: UsuarioEntity['id']) {
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
