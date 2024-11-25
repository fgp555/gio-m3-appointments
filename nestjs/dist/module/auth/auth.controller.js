"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthController = class AuthController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signup(createAuthDto) {
        const foundEmail = await this.userService.findOneEmail(createAuthDto.email);
        if (foundEmail)
            throw new common_1.UnauthorizedException('This email already exists');
        const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
        createAuthDto.password = hashedPassword;
        const userCreate = await this.userService.create(createAuthDto);
        const { password, ...withoutPassword } = userCreate;
        return withoutPassword;
    }
    async singin(createAuthDto) {
        const foundEmail = await this.userService.findOneEmail(createAuthDto.email);
        if (!foundEmail)
            throw new common_1.UnauthorizedException('Incorrect email or password');
        const isPasswordValid = await bcrypt.compare(createAuthDto.password, foundEmail.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Incorrect email or password');
        const { password, ...user } = foundEmail;
        const userPayload = {
            sub: foundEmail.id,
            id: foundEmail.id,
            email: foundEmail.email,
        };
        const token = this.jwtService.sign(userPayload);
        return { login: true, user, token };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "singin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map