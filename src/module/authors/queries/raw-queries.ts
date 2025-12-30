import { Prisma } from 'src/generated/prisma/client';
import { GetAuthorsDto, UpdateAuthorDto } from '../dto/author.dto';

export const AUTHORS_RAW_QUERY = {
  getAuthorById: (authorId: string) =>
    Prisma.sql`
      SELECT * FROM public."Author"
      WHERE id = ${authorId}
    `,

  updateAuthorById: (authorId: string, body: UpdateAuthorDto) => {
    const { name } = body;

    return Prisma.sql`
    UPDATE public."Author"
    SET name = ${name}
    WHERE id = ${authorId}`;
  },

  getAllAuthors: (query: GetAuthorsDto) => {
    const { search = '', page = 1, perPage = 10 } = query;

    const offset = (page - 1) * perPage;

    return Prisma.sql`
    SELECT *
    FROM public."Author"
    WHERE name ILIKE ${`%${search}%`}
    ORDER BY "createdAt" DESC
    LIMIT ${perPage}
    OFFSET ${offset} 
  `;
  },
};
