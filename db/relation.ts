// in this file we have to write relation
import { defineRelations } from "drizzle-orm";
import * as schema from "./schema/export";

export const relations = defineRelations(schema, (r) => ({
    usersTable: {
        posts: r.many.postTable({
            from: r.usersTable.id,
            to: r.postTable.userId,
        }),
    },
    postTable: {
        user: r.one.usersTable({
            from: r.postTable.userId,
            to: r.usersTable.id,
        }),
    },
    studentTable: {
        educations: r.many.studentEducationTable({
            from: r.studentTable.id,
            to: r.studentEducationTable.studentId,
        }),
        internships: r.many.InternshipTable({
            from: r.studentTable.id,
            to: r.InternshipTable.studentId,
        }),
        projects: r.many.projectTable({
            from: r.studentTable.id,
            to: r.projectTable.studentId,
        }),
    },
    studentEducationTable: {
        student: r.one.studentTable({
            from: r.studentEducationTable.studentId,
            to: r.studentTable.id,
        }),
    },
    InternshipTable: {
        student: r.one.studentTable({
            from: r.InternshipTable.studentId,
            to: r.studentTable.id,
        }),
    },
    projectTable: {
        student: r.one.studentTable({
            from: r.projectTable.studentId,
            to: r.studentTable.id,
        }),
    },
}));