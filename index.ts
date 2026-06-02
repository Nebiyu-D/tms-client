import {Temporal} from "@js-temporal/polyfill";
import {student, isStudent} from "./models/student.model";
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

function processStudent (raw: unknown) {
    if (isStudent(raw)) {
        const gpaDisplay = raw.gpa?.toFixed(2) ?? "not graded";
        console.log('Student ${raw.name} GPA: ${gpaDisplay}');
    }else{
        console.log("Invalid student data");
    }
}
 processStudent({id: "STU-001", name: "hana", gpa: 3.7});
 processStudent(42);

 
 import { parseStudent} from "./models/student.model"; 

console.log(parseStudent({id: "STU-001", name: "Hana"}));
parseStudent({ id: 42, name: "Test"});

// Lab M2-Lab-Session 2
import { AssessmentItem, calculateGrade } from "./models/assessment.model";

const quiz: AssessmentItem = {
    id: "QUIZ-001",
    kind:"quiz",
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

