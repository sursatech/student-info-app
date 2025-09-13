import { Request, Response } from 'express';
import prisma from '../prisma/client';

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;
    const student = await prisma.student.create({
      data: { name, email, age },
    });
    res.status(201).json(student);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get all students
export const getStudents = async (_req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id: Number(id) },
    });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student by ID
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const student = await prisma.student.update({
      where: { id: Number(id) },
      data: { name, email, age },
    });
    res.json(student);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a student by ID
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.student.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
