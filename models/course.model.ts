import {Temporal} from "@js-temporal/polyfill";
export interface Course{
    readonly id: string;
    title: string;
    capacity: number;
    startDate?: Temporal.PlainDate;
}

export type CourseStatus = 
| {status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant}
| {status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string}
| {
    status: "ACTIVE";
    enrolledCount: number;
    startDate: Temporal.Instant;
    finalEnrollmentCount: number;
}
| {status: "CANCELLED"; reason: string; cancelledAT: Temporal.Instant};

export function describeCourse(course:CourseStatus): string{
    switch(course.status){
        case "DRAFT":
            return 'created By ${course.createdBy}';
        case "PUBLISHED":
            return 'published Ay ${course.published}';
        case "ACTIVE":
            return 'Active with ${course.enrolledCount}';
        case "CANCELLED":
            return 'Cancelled ${course.reason}';
        default: {
            const_check: never = course;
            throw new Error('unhandled status: ${JSON.stringify(_check)}');
        }
    }
}