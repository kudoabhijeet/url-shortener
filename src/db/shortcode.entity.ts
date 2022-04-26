import { Column, Entity, getRepository, PrimaryColumn, Repository } from "typeorm";

@Entity()
export class ShortCode {
    @Column({type : 'text'})
    id!: string

    @PrimaryColumn({type : 'text'})
    shortcode!: string

    @Column({type : 'text'})
    longUrl!: string
}

export function getShortCodeRepository() : Repository<ShortCode> {
    return getRepository(ShortCode)
}