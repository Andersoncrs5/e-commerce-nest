import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ){}

  async token(user: User){
    if (!user) {
      throw new NotFoundException('User is required');
    }

    const payload = { 
      sub: user.id, 
      email: user.email, 
      isAdm: user.is_adm, 
    };
    
    const accessToken = this.jwtService.sign(payload); 

    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    this.repository.save(user);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async logout(userId: number) {
    const user = await this.repository.findOne({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    user.refreshToken = null;
    await this.repository.save(user);

    return { message: 'Logout realizado com sucesso' };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
  
      const foundUser = await this.repository.findOne({
        where: { id: payload.sub, refreshToken },
      });
  
      if (!foundUser) {
        throw new UnauthorizedException('Refresh token inválido');
      }
  
      const newAccessToken = this.jwtService.sign(
        { 
          sub: foundUser.id, 
          email: foundUser.email, 
          is_adm: foundUser.is_adm, 
        }
      );
  
      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }

}