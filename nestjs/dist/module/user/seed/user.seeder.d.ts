import { UserService } from '../user.service';
import { AuthController } from 'src/module/auth/auth.controller';
export declare class UserSeederService {
    private readonly userService;
    private readonly authController;
    constructor(userService: UserService, authController: AuthController);
    seed(): Promise<void>;
}
