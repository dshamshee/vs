"use client"

import {
    CheckCircle2,
    User,
    GraduationCap,
    ArrowLeft,
    Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRegistrationStore } from "../store/registration-store"
import { registerStudent } from "../lib/action"
import { useState } from "react"

const DetailRow = ({
    label,
    value,
}: {
    label: string
    value: string | number | boolean | null | undefined
}) => (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4">
        <span className="min-w-[160px] text-sm font-medium text-muted-foreground">
            {label}
        </span>
        <span className="text-sm font-semibold text-foreground">
            {typeof value === "boolean"
                ? value
                    ? "Yes"
                    : "No"
                : (value ?? "—")}
        </span>
    </div>
)

export const Review_Submit = () => {
    const { personalDetails, educationalDetails, setStep, reset } =
        useRegistrationStore()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitResult, setSubmitResult] = useState<{
        success: boolean
        message: string
    } | null>(null)

    const handleBack = () => {
        setStep(1)
    }

    const handleSubmit = async () => {
        if (!personalDetails || !educationalDetails) return

        setIsSubmitting(true)
        setSubmitResult(null)

        try {
            const result = await registerStudent({
                personalDetails,
                educationalDetails,
            })

            setSubmitResult(result)

            if (result.success) {
                reset()
            }
        } catch {
            setSubmitResult({
                success: false,
                message: "An unexpected error occurred. Please try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitResult?.success) {
        return (
            <Card className="shadow-lg border-green-500/20 bg-green-500/5">
                <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-700">
                        Registration Successful!
                    </h2>
                    <p className="text-center text-muted-foreground">
                        {submitResult.message}
                    </p>
                </CardContent>
            </Card>
        )
    }

    if (!personalDetails || !educationalDetails) {
        return (
            <Card className="shadow-lg border-destructive/20">
                <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
                    <p className="text-muted-foreground">
                        Missing form data. Please complete all steps first.
                    </p>
                    <Button variant="outline" onClick={() => setStep(0)}>
                        Go to Step 1
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            {/* Personal Details Review */}
            <Card className="shadow-lg border-primary/10">
                <CardHeader className="border-b border-border/50 pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">
                                    Personal Details
                                </CardTitle>
                                <CardDescription>
                                    Review your personal information
                                </CardDescription>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setStep(0)}
                        >
                            Edit
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <DetailRow
                            label="First Name"
                            value={personalDetails.first_name}
                        />
                        <DetailRow
                            label="Middle Name"
                            value={personalDetails.middle_name}
                        />
                        <DetailRow
                            label="Last Name"
                            value={personalDetails.last_name}
                        />
                        <DetailRow
                            label="Father's Name"
                            value={personalDetails.fathers_name}
                        />
                        <DetailRow
                            label="Mother's Name"
                            value={personalDetails.mothers_name}
                        />
                        <DetailRow
                            label="Date of Birth"
                            value={personalDetails.dob}
                        />
                        <DetailRow
                            label="Phone"
                            value={personalDetails.phone}
                        />
                        <DetailRow
                            label="Email"
                            value={personalDetails.email}
                        />
                        <DetailRow
                            label="Gender"
                            value={personalDetails.gender}
                        />
                        <DetailRow
                            label="Aadhar"
                            value={personalDetails.aadhar}
                        />
                        <DetailRow
                            label="Profile URL"
                            value={personalDetails.profile}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Educational Details Review */}
            <Card className="shadow-lg border-primary/10">
                <CardHeader className="border-b border-border/50 pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                <GraduationCap className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">
                                    Educational Details
                                </CardTitle>
                                <CardDescription>
                                    Review your academic information
                                </CardDescription>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setStep(1)}
                        >
                            Edit
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <DetailRow
                            label="University"
                            value={educationalDetails.university}
                        />
                        <DetailRow
                            label="College"
                            value={educationalDetails.college}
                        />
                        <DetailRow
                            label="Program"
                            value={educationalDetails.program}
                        />
                        <DetailRow
                            label="Enrollment No."
                            value={educationalDetails.enrollment_number}
                        />
                        <DetailRow
                            label="Currently Pursuing"
                            value={educationalDetails.is_on_going}
                        />
                        <DetailRow
                            label="CGPA"
                            value={`${educationalDetails.cgpa} / ${educationalDetails.cgpa_out_of}`}
                        />
                        <DetailRow
                            label="Passing Year"
                            value={educationalDetails.passing_year}
                        />
                        <DetailRow
                            label="Duration"
                            value={educationalDetails.duration}
                        />
                    </div>
                </CardContent>
            </Card>

            <Separator />

            {/* Error message */}
            {submitResult && !submitResult.success && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                    {submitResult.message}
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-between">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleBack}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Registration
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
