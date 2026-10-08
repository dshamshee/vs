import { boolean, date, decimal, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";


// id is always in 

export const genderEnum = pgEnum('gender', ['MALE', 'FEMALE', 'TRANSGENDER']);

export const studentTable = pgTable("student", {
    id: text(),
    first_name: text().notNull(),
    middle_name: text(),
    last_name: text().notNull(),
    fathers_name: text().notNull(),
    mothers_name: text().notNull(),
    dob: date().notNull(),
    email: text().unique().notNull(),
    phone: integer().unique().notNull(),
    gender: genderEnum().notNull(),
    aadhar: integer().unique().notNull(),
    profile: text(),
    is_accepted: boolean().notNull().default(false),
    created_at: timestamp("created_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
    updated_at: timestamp("updated_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
});


export const courseDuration = pgEnum('duration', ['2 YEARS', '3 YEARS', '4 YEARS', '5 YEARS', '6 YEARS'])

export const studentEducationTable = pgTable("student_education", {
    id: text(),
    studentId: text().references(() => studentTable.id).notNull(),
    university: text().notNull(),
    college: text().notNull(),
    program: text().notNull(),
    enrollment_number: text().unique().notNull(),
    is_on_going: boolean().notNull(),
    // full_marks: integer(),
    // obtain_marks: integer(),
    cgpa: decimal({ precision: 2, scale: 2 }).notNull(),
    cgpa_out_of: decimal({ precision: 2, scale: 2 }).notNull(),
    passing_year: date(),
    duration: courseDuration().notNull(),
    created_at: timestamp("created_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
    updated_at: timestamp("updated_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
});


export const InternshipStatus = pgEnum('status', ['APPLIED', 'JOINED', 'COMPLETED', 'DROPPED'])

export const internshipTable = pgTable('internship', {
    id: text(),
    studentId: text().references(() => studentTable.id).notNull(),
    stipend: integer().notNull(),
    start_date: date().notNull(),
    end_date: date().notNull(),
    mode: text().notNull().default('REMOTE'),
    status: InternshipStatus().notNull().default('APPLIED'),
    domain: text().notNull(),
    created_at: timestamp("created_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
    updated_at: timestamp("updated_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
})


export const projectTable = pgTable('project', {
    id: text(),
    studentId: text().references(() => studentTable.id).notNull(),
    title: text().notNull(),
    description: text().notNull(),
    start_date: date().notNull(),
    end_date: date().notNull(),
    tech_stack: text().array().notNull(),
    live_url: text().unique(),
    github_url: text().unique(),
    created_at: timestamp("created_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
    updated_at: timestamp("updated_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
})