import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('books', {
    id: 'id',
    title: { type: 'varchar(255)', notNull: true },
    author: { type: 'varchar(255)', notNull: true },
    publicationDate: { type: 'date', notNull: true },
    genres: { type: 'varchar(255)[]', notNull: true },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable('books');
};
