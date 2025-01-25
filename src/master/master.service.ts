import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MasterService {
    constructor(private readonly userServices:UsersService) {}

}
