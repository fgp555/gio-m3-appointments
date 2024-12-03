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
exports.MailTemplatesController = void 0;
const common_1 = require("@nestjs/common");
const mail_template_service_1 = require("./mail-template.service");
let MailTemplatesController = class MailTemplatesController {
    constructor(emailTemplatesService) {
        this.emailTemplatesService = emailTemplatesService;
    }
    async createTemplate(data) {
        return await this.emailTemplatesService.createTemplate(data);
    }
    async sentMailTemplate(data) {
        return await this.emailTemplatesService.sentMailRegister(data);
    }
    async getTemplates() {
        return await this.emailTemplatesService.getTemplates();
    }
    async getTemplateById(id) {
        return await this.emailTemplatesService.getTemplateById(id);
    }
    async updateTemplate(id, data) {
        return await this.emailTemplatesService.updateTemplate(id, data);
    }
    async deleteTemplate(id) {
        await this.emailTemplatesService.deleteTemplate(id);
    }
};
exports.MailTemplatesController = MailTemplatesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailTemplatesController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Post)('/sentMailTemplate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailTemplatesController.prototype, "sentMailTemplate", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MailTemplatesController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MailTemplatesController.prototype, "getTemplateById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MailTemplatesController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MailTemplatesController.prototype, "deleteTemplate", null);
exports.MailTemplatesController = MailTemplatesController = __decorate([
    (0, common_1.Controller)('mail-templates'),
    __metadata("design:paramtypes", [mail_template_service_1.MailTemplatesService])
], MailTemplatesController);
//# sourceMappingURL=mail-template.controller.js.map