import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserSkillsService } from './user-skills.service';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/utils/public-strategy';

@Public()
@ApiTags('user-skills')
@Controller('user-skills')
export class UserSkillsController {
  constructor(private readonly userSkillsService: UserSkillsService) {}

  @Post('add-skill')
  @ApiBody({
    description: 'Ajouter une compétence à un utilisateur',
    type: CreateUserSkillDto,
    // examples: {
    //   'application/json': {
    //     userId: 5,
    //     skillId: 2,
    //   },
    // },
  })
  async addSkillToUser(@Body() createUserSkillDto: CreateUserSkillDto) {
    const { userId, skillId } = createUserSkillDto;
    return this.userSkillsService.addSkillToUser(userId, skillId);
  }
  /**
   * Obtenir toutes les compétences associées à un utilisateur.
   * @param userId L'ID de l'utilisateur.
   */
  @Get('user/:id')
  async findSkillsByUser(@Param('id') userId: number) {
    return this.userSkillsService.findSkillsByUser(userId);
  }
}
