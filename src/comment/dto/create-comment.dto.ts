import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import * as sanitizeHtml from "sanitize-html";
import { Comment } from "../entities/comment.entity";


export class CreateCommentDto {
    @IsString({ message: "The field content should be a string" })
    @IsNotEmpty({ message: "The field content cannot be null" })
    @Length(1, 500, { message: "The max length of content is 500 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value) )
    content: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ example: "" })
    is_edited: boolean = false;

    @IsOptional()
    parent: Comment;
}
