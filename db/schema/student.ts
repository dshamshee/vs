import { boolean, date, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";


export const genderEnum = pgEnum('gender', ['male', 'female', 'transgender']);

export const studentTable = pgTable("student", {
    id: text().primaryKey().$defaultFn(() => createId()),
    firstName: text().notNull(),
    middleName: text(),
    lastName: text().notNull(),
    fathersName: text().notNull(),
    mothersName: text().notNull(),
    dob: date().notNull(),
    email: text().unique().notNull(),
    phone: integer().unique().notNull(),
    gender: genderEnum().notNull(),
    aadhar: integer().unique().notNull(),
    profile: text(),
    isAccepted: boolean().notNull().default(false),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
});


export const courseDuration = pgEnum('duration', ['2 YEARS', '3 YEARS', '4 YEARS', '5 YEARS', '6 YEARS'])

export const studentEducationTable = pgTable("student-education", {
    id: text().primaryKey().$defaultFn(() => createId()),
    studentId: text().references(() => studentTable.id).notNull(),
    university: text().notNull(),
    college: text().notNull(),
    program: text().notNull(),
    enrollmentNumber: text().unique().notNull(),
    isOnGoing: boolean().notNull(),
    fullMarks: integer(),
    obtainMarks: integer(),
    passingYear: date(),
    duration: courseDuration().notNull(),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
});


export const InternshipStatus = pgEnum('status', ['APPLIED', 'JOINED', 'COMPLETED', 'DROPPED'])

export const InternshipTable = pgTable('internship', {
    id: text().primaryKey().$defaultFn(() => createId()),
    studentId: text().references(() => studentTable.id).notNull(),
    stipend: integer().notNull(),
    startDate: date().notNull(),
    endDate: date().notNull(),
    mode: text().notNull().default('REMOTE'),
    status: InternshipStatus().notNull().default('APPLIED'),
    domain: text().notNull(),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
})


export const projectTable = pgTable('project', {
    id: text().primaryKey().$defaultFn(() => createId()),
    studentId: text().references(() => studentTable.id).notNull(),
    title: text().notNull(),
    description: text().notNull(),
    startDate: date().notNull(),
    endDate: date().notNull(),
    techStack: text().array().notNull(),
    liveUrl: text().unique(),
    gitHubUrl: text().unique(),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
})