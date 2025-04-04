import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshTokenDTO {
    @ApiProperty({ example : "" })
    @IsString()
    refresh_token: string;
}  