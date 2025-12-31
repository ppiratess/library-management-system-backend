import { v4 as uuidv4 } from 'uuid';

import { CreateBookDto } from '../dto/books.dto';
import { getUTCDate } from 'src/util/date.utils';
import { Prisma } from 'src/generated/prisma/client';

export const BOOKS_RAW_QUERY = {
  createBook: (query: CreateBookDto) => {
    const { title, totalStock, year, authorIds } = query;
    const bookUuid = uuidv4();
    const now = getUTCDate();

    return Prisma.sql`
      WITH new_book AS (
          INSERT INTO public."Book" (
              "id", "title", "year", "totalStock", "availableStock", "createdAt", "updatedAt"
          )
          VALUES (
              ${bookUuid}, ${title}, ${year}, ${totalStock}, ${totalStock}, ${now}, ${now}
          )
          RETURNING "Book".id
      ),
      link_authors AS (
        INSERT INTO public."BookAuthor" ("bookId", "authorId")
        SELECT
          new_book.id,
          unnested_authors.id
        FROM new_book
        CROSS JOIN UNNEST(${authorIds}::uuid[]) AS unnested_authors(id)
      )
      SELECT * FROM new_book;
    `;
  },
};
