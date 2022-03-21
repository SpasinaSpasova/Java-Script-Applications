import { html, render } from '../node_modules/lit-html/lit-html.js';
import { ifDefined } from '../node_modules/lit-html/directives/if-defined.js';

document.querySelector('#searchBtn').addEventListener('click', onClick);

let studentTemplate = (student) => html`
   <tr class=${ifDefined(student.class)}>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
   </tr>
`
let allStudentsTemplate = (students) => html`
      ${students.map(x => studentTemplate(x))}
`
let students = [];

loadStudents();

let tableTbody = document.querySelector('.container tbody');

async function loadStudents() {
   let studentResponse = await fetch('http://localhost:3030/jsonstore/advanced/table');
   let studentObj = await studentResponse.json();

   students = Object.values(studentObj).map(s => ({
      name: `${s.firstName} ${s.lastName}`,
      email: s.email,
      course: s.course
   }));

   render(allStudentsTemplate(students), tableTbody);

}
function onClick(event) {
   let srchInp = document.getElementById('searchField');
   let srchText = srchInp.value.toLowerCase();

   let allStudents = students.map(s => Object.assign({}, s));

   let matchedStudents = allStudents.
      filter(x => Object.values(x).
         some(p => p.toLowerCase().includes(srchText.toLowerCase())));

   matchedStudents.forEach(s => s.class = 'select');
   srchInp.value = '';
   render(allStudentsTemplate(allStudents), tableTbody);
}