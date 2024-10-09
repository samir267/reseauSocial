import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728068594789 implements MigrationInterface {
    name = 'Migrations1728068594789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`accessToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`passwordResetTokenExpires\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`passwordResetToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profilePhotoUrl\` \`profilePhotoUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`location\` \`location\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('admin', 'user') NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`occupation\` \`occupation\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`verificationCode\` \`verificationCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`verificationCodeExpires\` \`verificationCodeExpires\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`verificationCodeExpires\` \`verificationCodeExpires\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`verificationCode\` \`verificationCode\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`occupation\` \`occupation\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('admin', 'user') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`location\` \`location\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profilePhotoUrl\` \`profilePhotoUrl\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`passwordResetToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`passwordResetTokenExpires\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`accessToken\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
