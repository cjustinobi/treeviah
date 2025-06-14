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
        try {
            const found = await this.findOneBy({ email });
            return await comparePassword(password, found.password);
        }
        catch (error) {
            console.log(`User with email: ${email} not found`);
        }
    },
    async findByEmail(email) {
        const user = await this.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
const hashPassWord = (password, salt) => {
    return bcrypt.hash(password, salt);
};
const comparePassword = async (plaintextPassword, hash) => {
    return await bcrypt.compare(plaintextPassword, hash);
};
//# sourceMappingURL=auth.respository.js.map