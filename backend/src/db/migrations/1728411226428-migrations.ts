import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728411226428 implements MigrationInterface {
    name = 'Migrations1728411226428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`refreshToken\` varchar(255) NULL, \`profilePhotoUrl\` varchar(255) NULL, \`location\` varchar(255) NULL, \`role\` enum ('admin', 'user') NULL, \`occupation\` varchar(255) NULL, \`viewedProfile\` int NOT NULL DEFAULT '0', \`impressions\` int NOT NULL DEFAULT '0', \`isVerified\` tinyint NOT NULL DEFAULT 0, \`verificationCode\` varchar(255) NULL, \`verificationCodeExpires\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
