import { Request, Response } from 'express';

import db from '../db';
import { Book } from '../models/book';

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author, publicationDate, genres } = req.body;
    const newBook: Book = { title, author, publicationDate, genres };
    const result = await db.one(
      `INSERT INTO books (title, author, publicationDate, genres) VALUES ($1, $2, $3, $4) RETURNING *`,
      [newBook.title, newBook.author, newBook.publicationDate, newBook.genres],
    );
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await db.any('SELECT * FROM books');
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await db.oneOrNone('SELECT * FROM books WHERE id = $1', [id]);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, publicationDate, genres } = req.body;
    const updatedBook: Book = { title, author, publicationDate, genres };
    const result = await db.one(
      `UPDATE books SET title = $1, author = $2, publicationDate = $3, genres = $4 WHERE id = $5 RETURNING *`,
      [updatedBook.title, updatedBook.author, updatedBook.publicationDate, updatedBook.genres, id],
    );
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.none('DELETE FROM books WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
