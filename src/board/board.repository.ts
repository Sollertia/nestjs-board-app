import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CustomRepository } from '../orm/typeorm-ex.decorator';
import { BoardReqDto } from './dto/board.req.dto';
import { BoardStatus } from './board-status.enum';
import { User } from '../auth/user.entity';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(reqDto: BoardReqDto, user: User): Promise<Board> {
    const { title, description } = reqDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }

  async getBoards(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });
    return await query.getMany();
  }

  async getBoardById(id: number): Promise<Board> {
    const findBoard = await this.findOne({ where: { id } });

    if (!findBoard) {
      throw new NotFoundException(`해당하는 ${id} 게시글을 찾을 수 없습니다.`);
    }

    return findBoard;
  }

  async deleteBoardById(id: number, user: User): Promise<void> {
    const query = this.createQueryBuilder()
      .delete()
      .from(Board)
      .where('id = :id and userId = :userId', {
        id: id,
        userId: user.id,
      });

    const result = await query.execute();
    // console.log('result', result);

    // const result = this.boardRepository.delete({ id, user }); // 확인 필요!
    if (result.affected === 0) {
      throw new NotFoundException(
        `해당하는 ${id} 게시글을 찾을 수 없어 삭제가 불가능합니다.`,
      );
    }
  }

  async updateBoardStatus(
    id: number,
    status: BoardStatus,
    user: User,
  ): Promise<Board> {
    const query = this.createQueryBuilder()
      .update(Board)
      .set({ status: status })
      .where('id = :id and userId = :userId', {
        id: id,
        userId: user.id,
      });

    const result = await query.execute();
    // console.log('result', result);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당하는 ${id} 게시글을 찾을 수 없어 Update에 실패했습니다.`,
      );
    }

    return this.getBoardById(id);
  }
}
