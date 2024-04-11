const { Pool } = require("pg");

const pool = new Pool({
    user: "development",
    password: "development",
    host: "localhost",
    database: "bootcampx"
});

const input = process.argv.slice(2);
const cohortName = input[0];
const limit = input[1];

pool
    .query(
        `
SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '${cohortName}%'
LIMIT ${limit || 5};
`
    )
    .then((res) => {
        res.rows.forEach((user) => {
            console.log(
                `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
            );
        });
    });