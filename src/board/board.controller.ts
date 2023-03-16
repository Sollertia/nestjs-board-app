import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardReqDto } from './dto/board.req.dto';
import { BoardStatusValidationPipe } from './pipes/BoardStatusValidationPipe';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/get-all')
  getBoards(): Promise<Board[]> {
    return this.boardService.getBoards();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createBoard(@Body() reqDto: BoardReqDto): Promise<Board> {
    return this.boardService.createBoard(reqDto);
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
  deleteBoardById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardService.deleteBoardById(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
