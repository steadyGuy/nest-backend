import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewModel)
    private readonly reviewRepository: Repository<ReviewModel>
  ) { }
}
