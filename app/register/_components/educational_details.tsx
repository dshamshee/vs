"use client"

import { useCallback } from "react"
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
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select"
import { Switch } from "@/components/ui/switch"
import {
    student_educational_schema,
    type Student_Educational_Type,
} from "../lib/zod-type/register-type"
import { courseDuration } from "@/db/schema/student"
import { useRegistrationStore } from "../store/registration-store"
import { AutocompleteInput } from "./autocomplete-input"
import {
    fetchUniversities,
    fetchColleges,
} from "../lib/api/education-api"

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

    // Force uppercase on change for text fields
    const handleUppercaseChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldOnChange: (value: string) => void
    ) => {
        fieldOnChange(e.target.value.toUpperCase())
    }

    // Stable references for autocomplete fetch functions
    const universityFetcher = useCallback(
        (query: string) => fetchUniversities(query),
        []
    )

    const collegeFetcher = useCallback(
        (query: string) => fetchColleges(query),
        []
    )

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
                        {/* University and College - 3 columns for consistency */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                                            <AutocompleteInput
                                                value={field.value}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                fetchSuggestions={
                                                    universityFetcher
                                                }
                                                placeholder="Search university name"
                                                manualPlaceholder="Enter university name manually"
                                                manualLabel="University not listed? Enter manually"
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
                                            <AutocompleteInput
                                                value={field.value}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                fetchSuggestions={
                                                    collegeFetcher
                                                }
                                                placeholder="Search college name"
                                                manualPlaceholder="Enter college name manually"
                                                manualLabel="College not listed? Enter manually"
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
                                name="program"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>Program *</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                onChange={(e) =>
                                                    handleUppercaseChange(
                                                        e,
                                                        field.onChange
                                                    )
                                                }
                                                placeholder="e.g., B.Tech CSE"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Enrollment, CGPA, CGPA out of - 3 columns */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                                                onChange={(e) =>
                                                    handleUppercaseChange(
                                                        e,
                                                        field.onChange
                                                    )
                                                }
                                                placeholder="Enter enrollment number"
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
                        </div>

                        {/* Passing year, Duration, Is ongoing - 3 columns */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                                            <NativeSelect
                                                className="w-full"
                                                {...field}
                                                value={field.value ?? ""}
                                                aria-invalid={!!fieldState.error}
                                            >
                                                <NativeSelectOption value="" disabled>
                                                    Select passing year
                                                </NativeSelectOption>
                                                {[
                                                    "2024",
                                                    "2025",
                                                    "2026",
                                                    "2027",
                                                    "2028",
                                                    "2029",
                                                    "2030",
                                                ].map((year) => (
                                                    <NativeSelectOption
                                                        key={year}
                                                        value={year}
                                                    >
                                                        {year}
                                                    </NativeSelectOption>
                                                ))}
                                            </NativeSelect>
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
                                            <NativeSelect
                                                className="w-full"
                                                {...field}
                                                value={field.value ?? ""}
                                                aria-invalid={!!fieldState.error}
                                            >
                                                <NativeSelectOption value="" disabled>
                                                    Select duration
                                                </NativeSelectOption>
                                                {courseDuration.enumValues.map(
                                                    (duration) => (
                                                        <NativeSelectOption
                                                            key={duration}
                                                            value={duration}
                                                        >
                                                            {duration}
                                                        </NativeSelectOption>
                                                    )
                                                )}
                                            </NativeSelect>
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