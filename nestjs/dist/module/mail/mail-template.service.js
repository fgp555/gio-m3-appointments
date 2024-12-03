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
exports.MailTemplatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mail_template_entity_1 = require("./entities/mail-template.entity");
let MailTemplatesService = class MailTemplatesService {
    constructor(emailTemplateRepository) {
        this.emailTemplateRepository = emailTemplateRepository;
    }
    async createTemplate(data) {
        const template = this.emailTemplateRepository.create(data);
        return await this.emailTemplateRepository.save(template);
    }
    async getTemplates() {
        return await this.emailTemplateRepository.find();
    }
    async getTemplateById(id) {
        return await this.emailTemplateRepository.findOne({ where: { id } });
    }
    async updateTemplate(id, data) {
        await this.emailTemplateRepository.update(id, data);
        return await this.getTemplateById(id);
    }
    async deleteTemplate(id) {
        await this.emailTemplateRepository.delete(id);
    }
};
exports.MailTemplatesService = MailTemplatesService;
exports.MailTemplatesService = MailTemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mail_template_entity_1.MailTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MailTemplatesService);
//# sourceMappingURL=mail-template.service.js.map