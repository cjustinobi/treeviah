"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAuthRepository = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
exports.CustomAuthRepository = {
    async register(registerUserDto) {
        const { password } = registerUserDto;
        const salt = await bcrypt.genSalt();
        registerUserDto.salt = salt;
        registerUserDto.password = await hashPassWord(password, salt);
        return this.save(registerUserDto);
    },
    async validateUserPassword(loginUserDto) {
        const { email, password } = loginUserDto;
        const found = await this.findOneBy({ email });
        if (!found)
            throw new common_1.NotFoundException(`User with email: ${email} not found`);
        return await comparePassword(password, found.password);
    }
};
const hashPassWord = (password, salt) => {
    return bcrypt.hash(password, salt);
};
const comparePassword = async (plaintextPassword, hash) => {
    return await bcrypt.compare(plaintextPassword, hash);
};
//# sourceMappingURL=auth.respository.js.map