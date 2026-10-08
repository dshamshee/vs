// in this file we have to write relation
import { defineRelations } from "drizzle-orm";
import * as schema from "./schema/export";

export const relations = defineRelations(schema, (r) => ({
   
    studentTable: {
        educations: r.many.studentEducationTable({
            from: r.studentTable.id,
            to: r.studentEducationTable.studentId,
        }),
        internships: r.many.internshipTable({
            from: r.studentTable.id,
            to: r.internshipTable.studentId,
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
            from: r.internshipTable.studentId,
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