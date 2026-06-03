import { Temporal } from "@js-temporal/polyfill";
import { student, isStudent } from "./models/student.model";
//import {isStudent} from "./models/student.model";


const student: student =
{
    id: "stu-001",
    name: "Hana Tadesse",
    enrollmentDate: Temporal.Now.instant(),
};

//student.id = "STU-999";
//console.log(student.gpa.toFixed(2));
console.log(student.gpa?.toFixed(2) ?? "Not yet graded");



//import { student, isStudent } from "./models/student.model";

function processStudent(raw: unknown) {
    if (isStudent(raw)) {
        const gpaDisplay = raw.gpa?.toFixed(2) ?? "not graded";
        console.log('Student ${raw.name} GPA: ${gpaDisplay}');
    } else {
        console.log("Invalid student data");
    }
}
processStudent({ id: "STU-001", name: "hana", gpa: 3.7 });
processStudent(42);


import { parseStudent } from "./models/student.model";

console.log(parseStudent({ id: "STU-001", name: "Hana" }));
parseStudent({ id: 42, name: "Test" });

// Lab M2-Lab-Session 2
import { AssessmentItem, calculateGrade } from "./models/assessment.model";

const quiz: AssessmentItem = {
    id: "QUIZ-001",
    kind: "quiz",
    title: "SQL Basics",
    correctAnswers: 8,
    totalQuestions: 10,
};

const lab: AssessmentItem = {
    id: "LAB-001",
    kind: "lab",
    title: "REST API Project",
    functionalityScore: 85,
    codeQualityScore: 90,
};

console.log('Quiz grade: ${calculateGrade(quiz)}%');   //80
console.log('Lab Grade: ${calculateGrade(lab)}%');    //87

// quiz.id = "QUIZ-999";    //  WE CAN NOT ASSIGN BECAUSE ID IS READONLY

import { CourseStatus, describeCourse } from "./models/course.model";
const webDev: CourseStatus = {
    status: "ACTIVE",
    enrolledCount: 28,
    startDate: Temporal.Instant.from("2026-09-01T00:00:00Z"),
};
console.log(describeCourse(webDev));

import { ApiResponse, renderResponse } from "./models/api-response.model";
import { Course } from "./models/course.model";
const studentRes: ApiResponse<student> = {
    status: "success",
    data: {
        id: "STU-001",
        name: "Dawit Bekele",
        enrollmentDate: Temporal.Now.instant(),
        gpa: 3.4,
    },
    fetchedAt: Temporal.Now.instant(),
};
console.log(
    renderResponse(studentRes, (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`),
);
// Nowtest with a different data type
const courseListRes: ApiResponse<Course[]> = {
    status: "success",
    data: [
        {
            id: "CRS-101",
            title: "Web Development Fundamentals",
            capacity: 30,
            startDate: Temporal.PlainDate.from("2026-09-01"),
        },
    ],
    fetchedAt: Temporal.Now.instant(),
};
console.log(
    renderResponse(courseListRes, (courses) =>
        courses.map((c) => c.title).join(", "),
    ),
);


//<<<<<<<<<<<<<<<<      Exercise 7: Temporal Timestamps (Dates, Timezones, Durations)  >>>>>>>> 
// 1. Record the exact moment an enrollment is approved (UTC)
const approvedAt = Temporal.Now.instant();
console.log(`Approved at (UTC): ${approvedAt}`);
// 2. Display in local timezone
const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");
console.log(`Addis: ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);
// Same moment, different wall-clock time
// 3. Course start date (date only, no time)
const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();
const daysUntilStart = today.until(courseStart).total({ unit: "days" });
console.log(`${Math.floor(daysUntilStart)} days until course starts`);
// 4. Assignment deadline duration
const deadline = Temporal.PlainDate.from("2026-12-15");
const remaining = today.until(deadline);
console.log(
    `${remaining.total({ unit: "days" })} days until assignment is due`,
);