"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { BookOpen, GraduationCap, Hash, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
    student_educational_schema,
    type Student_Educational_Type,
} from "../lib/zod-type/register-type"
import { courseDuration } from "@/db/schema/student"
import { useRegistrationStore } from "../store/registration-store"

export const Educational_Details_Form = () => {
    const { educationalDetails, setEducationalDetails, setStep } =
        useRegistrationStore()

    const form = useForm<Student_Educational_Type>({
        resolver: zodResolver(student_educational_schema),
        defaultValues: educationalDetails ?? {
            university: "",
            college: "",
            program: "",
            enrollment_number: "",
            is_on_going: false,
            cgpa: 0,
            cgpa_out_of: 10,
            passing_year: "",
            duration: undefined,
        },
    })

    const onSubmit = (data: Student_Educational_Type) => {
        setEducationalDetails(data)
        setStep(2)
    }

    const handleBack = () => {
        setStep(0)
    }

    return (
        <Card className="shadow-lg border-primary/10">
            <CardHeader className="border-b border-border/50 pb-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">
                            Educational Details
                        </CardTitle>
                        <CardDescription>
                            Provide your academic background information
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* University and College */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Controller
                                control={form.control}
                                name="university"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>
                                            <BookOpen className="h-4 w-4" />
                                            University *
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                placeholder="Enter university name"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="college"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>College *</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                placeholder="Enter college name"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Program and Enrollment */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Controller
                                control={form.control}
                                name="program"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>Program *</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                placeholder="e.g., B.Tech CSE"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="enrollment_number"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>
                                            <Hash className="h-4 w-4" />
                                            Enrollment Number *
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                placeholder="Enter enrollment number"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </div>

                        {/* CGPA, CGPA out of, Is on going */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <Controller
                                control={form.control}
                                name="cgpa"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>CGPA *</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max="10"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                                placeholder="e.g., 8.5"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="cgpa_out_of"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>CGPA Out Of *</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max="10"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                                placeholder="e.g., 10"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="is_on_going"
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel>Currently Pursuing</FieldLabel>
                                        <FieldContent>
                                            <div className="flex items-center gap-3 pt-1">
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                                <span className="text-sm text-muted-foreground">
                                                    {field.value
                                                        ? "Yes, ongoing"
                                                        : "No, completed"}
                                                </span>
                                            </div>
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Passing year and Duration */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Controller
                                control={form.control}
                                name="passing_year"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>
                                            <CalendarDays className="h-4 w-4" />
                                            Passing Year *
                                        </FieldLabel>
                                        <FieldContent>
                                            <Select
                                                value={field.value ?? ""}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select passing year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[
                                                        "2024",
                                                        "2025",
                                                        "2026",
                                                        "2027",
                                                        "2028",
                                                        "2029",
                                                        "2030",
                                                    ].map((year) => (
                                                        <SelectItem
                                                            key={year}
                                                            value={year}
                                                        >
                                                            {year}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="duration"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>
                                            Course Duration *
                                        </FieldLabel>
                                        <FieldContent>
                                            <Select
                                                value={field.value ?? ""}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select duration" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {courseDuration.enumValues.map(
                                                        (duration) => (
                                                            <SelectItem
                                                                key={duration}
                                                                value={
                                                                    duration
                                                                }
                                                            >
                                                                {duration}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </div>
                    </FieldGroup>

                    {/* Actions */}
                    <div className="mt-8 flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={handleBack}
                        >
                            ← Back
                        </Button>
                        <Button type="submit" size="lg">
                            Save & Continue →
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}