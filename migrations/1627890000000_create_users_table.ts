import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'varchar(50)', notNull: true, unique: true },
    password: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    role: { type: 'int', notNull: true },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable('users');
};
