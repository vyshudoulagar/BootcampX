const { Pool } = require("pg");

const pool = new Pool({
    user: "development",
    password: "development",
    host: "localhost",
    database: "bootcampx"
});

const input = process.argv.slice(2);
const cohort = input[0];

pool
    .query(
        `
        SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort 
        FROM teachers
        JOIN assistance_requests ON assistance_requests.teacher_id = teachers.id
        JOIN students ON students.id = assistance_requests.student_id
        JOIN cohorts ON cohorts.id = students.cohort_id
        WHERE cohorts.name = '${cohort || 'JUL02'}'
        ORDER BY teacher;
        `
    )
    .then((res) => {
        res.rows.forEach(row => {
            console.log(`${row.cohort}: ${row.teacher}`);
        });
    });