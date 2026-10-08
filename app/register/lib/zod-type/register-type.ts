import { string, z } from 'zod'
import {courseDuration, genderEnum} from '@/db/schema/student' 

export const student_details_schema = z.object({
    first_name: z.string().min(3, { message: "First name must be at least 3 characters long" }).uppercase(),
    middle_name: z.string().trim().uppercase().optional(),
    last_name: z.string().min(3, {message: "Last name must be at least 3 characters long"}).uppercase(),
    fathers_name: z.string().min(3, {message: "Fathers name must be at least 3 characters long"}).uppercase(),
    mothers_name: z.string().min(3, {message: "Mothers name must be at least 3 characters long"}).uppercase(),
    dob: z.string().optional().nullable(),
    phone: z.string().min(10, {message: "Phone number must be at least 10 digits"}).max(10, {message: "Phone number must be at most 10 digits"}),
    email: z.email().trim().uppercase(),
    gender: z.enum(genderEnum.enumValues),
    aadhar: z.string().min(12, {message: "aadhar number must be at least 12 digits"}).max(12, {message: "aadhar number must be at most 12 digits"}).trim(),
    profile: z.string().optional()
})

export type Student_Details_Type = z.infer<typeof student_details_schema>;


export const student_educational_schema = z.object({
    university: z.string().min(3, {message: "University name must be at least 3 characters"}).trim().uppercase(),
    college: z.string().min(3, {message: "College name must be at least 3 characters"}).trim().uppercase(),
    program: z.string().min(3, {message: "Program name must be at least 3 characters"}).trim().uppercase(),
    enrollment_number: z.string().min(5, {message: "Enrollment number must be at least 5 characters"}).trim().uppercase(),
    is_on_going: z.boolean(),
    cgpa: z.number().nonnegative().max(10, {message: "CGPA cannot be greater than 10"}),
    cgpa_out_of: z.number().nonnegative().max(10, {message: "CGPA out of cannot be greater than 10"}),
    passing_year: z.string(),
    duration: z.enum(courseDuration.enumValues)
})

export type Student_Educational_Type = z.infer<typeof student_educational_schema>;