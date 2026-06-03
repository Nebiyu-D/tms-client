import { Temporal } from "@js-temporal/polyfill";
export interface Course {
    readonly id: string;
    title: string;
    capacity: number;
    startDate?: Temporal.PlainDate;
}

export type CourseStatus =
    | { status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant }
    | { status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string }
    | {
        status: "ACTIVE";
        enrolledCount: number;
        startDate: Temporal.Instant;
    }
    | {
        status: "ARCHIVED";
        archivedAt: Temporal.Instant;
        finalEnrollmentCount: number;
    }
    | { status: "CANCELLED"; reason: string; cancelledAT: Temporal.Instant };

export function describeCourse(status: CourseStatus): string {
    switch (status.status) {
        case "DRAFT":
            return 'created By ${status.createdBy}';
        case "PUBLISHED":
            return 'published Ay ${status.published}';
        case "ACTIVE":
            return 'Active with ${status.startDate} and ${status.enrolledCount} students';
        case "ARCHIVED":
      return `Archived at ${status.archivedAt} with a final count of ${status.finalEnrollmentCount} students`;
            case "CANCELLED":
            return 'Cancelled at ${status.cancelledAT} due to: ${status.reason}';
        default: {
            const _check: never = status;
            throw new Error('unhandled status: ${JSON.stringify(_check)}');
        }
    }
}

