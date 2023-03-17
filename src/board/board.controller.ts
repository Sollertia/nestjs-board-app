import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardReqDto } from './dto/board.req.dto';
import { BoardStatusValidationPipe } from './pipes/BoardStatusValidationPipe';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}
  private logger = new Logger('BoardController');

  @Get('/get-all')
  getBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} request getBoards`);
    return this.boardService.getBoards(user);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() reqDto: BoardReqDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} request getBoards payload: ${JSON.stringify(
        reqDto,
      )}`,
    );
    return this.boardService.createBoard(reqDto, user);
  }

  @Get('/get')
  getBoardByIdQuery(@Query('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Get('/:id')
  getBoardByIdParam(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoardById(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status, user);
  }
}
