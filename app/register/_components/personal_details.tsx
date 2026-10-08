"use client"

import { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { User, Phone, Mail, Calendar, CreditCard, ImageUp, X } from "lucide-react"
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
import {
    student_details_schema,
    type Student_Details_Type,
} from "../lib/zod-type/register-type"
import { genderEnum } from "@/db/schema/student"
import { useRegistrationStore } from "../store/registration-store"

export const Personal_Details_Form = () => {
    const { personalDetails, setPersonalDetails, setStep } =
        useRegistrationStore()
    const [profilePreview, setProfilePreview] = useState<string | null>(null)
    const [profileFile, setProfileFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<Student_Details_Type>({
        resolver: zodResolver(student_details_schema),
        defaultValues: personalDetails ?? {
            first_name: "",
            middle_name: "",
            last_name: "",
            fathers_name: "",
            mothers_name: "",
            dob: "",
            phone: "",
            email: "",
            gender: undefined,
            aadhar: "",
            profile: "",
        },
    })

    const onSubmit = (data: Student_Details_Type) => {
        setPersonalDetails(data)
        setStep(1)
    }

    return (
        <Card className="shadow-lg border-primary/10">
            <CardHeader className="border-b border-border/50 pb-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">
                            Personal Details
                        </CardTitle>
                        <CardDescription>
                            Enter your personal information carefully
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* Name fields row */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <Controller
                                control={form.control}
                                name="first_name"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>First Name *</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                placeholder="Enter first name"
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
                                name="middle_name"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>Middle Name</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                placeholder="Enter middle name"
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
                                name="last_name"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>Last Name *</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                placeholder="Enter last name"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Parents' names */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Controller
                                control={form.control}
                                name="fathers_name"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>
                                            Father&apos;s Name *
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                placeholder="Enter father's name"
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
                                name="mothers_name"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>
                                            Mother&apos;s Name *
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                placeholder="Enter mother's name"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </div>

                        {/* DOB, Phone, Email */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <Controller
                                control={form.control}
                                name="dob"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>
                                            <Calendar className="h-4 w-4" />
                                            Date of Birth
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                type="date"
                                                {...field}
                                                value={field.value ?? ""}
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
                                name="phone"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>
                                            <Phone className="h-4 w-4" />
                                            Phone Number *
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                type="tel"
                                                maxLength={10}
                                                placeholder="10-digit phone number"
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
                                name="email"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>
                                            <Mail className="h-4 w-4" />
                                            Email *
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="email@example.com"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Gender, Aadhar */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <Controller
                                control={form.control}
                                name="gender"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>Gender *</FieldLabel>
                                        <FieldContent>
                                            <Select
                                                value={field.value ?? ""}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {genderEnum.enumValues.map(
                                                        (gender) => (
                                                            <SelectItem
                                                                key={gender}
                                                                value={gender}
                                                            >
                                                                {gender}
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

                            <Controller
                                control={form.control}
                                name="aadhar"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel>
                                            <CreditCard className="h-4 w-4" />
                                            Aadhar Number *
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...field}
                                                maxLength={12}
                                                placeholder="12-digit Aadhar number"
                                            />
                                            <FieldError>
                                                {fieldState.error?.message}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Profile Photo Upload */}
                        <Controller
                            control={form.control}
                            name="profile"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={!!fieldState.error}>
                                    <FieldLabel>
                                        <ImageUp className="h-4 w-4" />
                                        Profile Photo
                                    </FieldLabel>
                                    <FieldContent>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0]
                                                if (file) {
                                                    setProfileFile(file)
                                                    const previewUrl =
                                                        URL.createObjectURL(
                                                            file
                                                        )
                                                    setProfilePreview(
                                                        previewUrl
                                                    )
                                                    // TODO: Upload to Cloudinary and set the returned URL
                                                    field.onChange(file.name)
                                                }
                                            }}
                                        />

                                        {profilePreview ? (
                                            <div className="relative w-fit">
                                                <img
                                                    src={profilePreview}
                                                    alt="Profile preview"
                                                    className="h-32 w-32 rounded-lg border border-border object-cover shadow-sm"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80 transition-colors"
                                                    onClick={() => {
                                                        setProfilePreview(null)
                                                        setProfileFile(null)
                                                        field.onChange("")
                                                        if (
                                                            fileInputRef.current
                                                        ) {
                                                            fileInputRef.current.value =
                                                                ""
                                                        }
                                                    }}
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                                <p className="mt-1.5 text-xs text-muted-foreground">
                                                    {profileFile?.name}
                                                </p>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 transition-colors hover:border-primary/40 hover:bg-muted/50"
                                            >
                                                <ImageUp className="h-8 w-8 text-muted-foreground/50" />
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-muted-foreground">
                                                        Click to upload photo
                                                    </p>
                                                    <p className="text-xs text-muted-foreground/60">
                                                        JPG, PNG or WebP
                                                    </p>
                                                </div>
                                            </button>
                                        )}

                                        <FieldError>
                                            {fieldState.error?.message}
                                        </FieldError>
                                    </FieldContent>
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    {/* Actions */}
                    <div className="mt-8 flex justify-end">
                        <Button type="submit" size="lg">
                            Save & Continue →
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}