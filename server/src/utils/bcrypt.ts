import { compare, genSalt, hash } from 'bcrypt'
import keys from '../config/keys'

const { SALT_ROUNDS, SECRET_HASH_PASSWORD } = keys

class BcryptUtlis {
    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(SALT_ROUNDS)
        return hash(password + SECRET_HASH_PASSWORD, salt)
    }

    // static async hasPassword(password: string): Promise<string> {
    //     console.log(this.saltRounds)
    //     const salt = await genSalt(this.saltRounds)
    //     return hash(password + this.secretHahPassword, salt)
    // }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return compare(password + SECRET_HASH_PASSWORD, hash)
    }
}

const bcryptUtlis = new BcryptUtlis()

export default bcryptUtlis

