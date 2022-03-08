async function solve() {
    const url = `http://localhost:3030/jsonstore/collections/students`;
    const table = document.querySelector('#results tbody');

    const resp = await fetch(url);
    const data = await resp.json();

    Object.values(data).forEach(x => {
        const fname = x.firstName;
        const lname = x.lastName;
        const facNum = x.facultyNumber;
        const grade = Number(x.grade);

        const tr = document.createElement('tr');

        const fnameCell = tr.insertCell(0);
        fnameCell.innerText = fname;

        const lnameCell = tr.insertCell(1);
        lnameCell.innerText = lname;

        const facNumCell = tr.insertCell(2);
        facNumCell.innerText = facNum;

        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = grade;

        table.appendChild(tr);
    });

    let submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onClickSubmit);
    async function onClickSubmit(event) {
        event.preventDefault();
        let fnameInp = document.getElementsByName('firstName')[0].value;
        let lnameInp = document.getElementsByName('lastName')[0].value;
        let facNumInp = document.getElementsByName('facultyNumber')[0].value;
        let gradeInp = document.getElementsByName('grade')[0].value;
        console.log(event.target.parentNode);
        if (fnameInp != '' && lnameInp != '' && facNumInp != '' && gradeInp != '') {
            let res = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: fnameInp,
                    lastName: lnameInp,
                    facultyNumber: facNumInp,
                    grade: gradeInp
                })
            });

            const tr = document.createElement('tr');

            const fnameCell = tr.insertCell(0);
            fnameCell.innerText = fnameInp;

            const lnameCell = tr.insertCell(1);
            lnameCell.innerText = lnameInp;

            const facNumCell = tr.insertCell(2);
            facNumCell.innerText = facNumInp;

            const gradeCell = tr.insertCell(3);
            gradeCell.innerText = gradeInp;

            table.appendChild(tr);
        }
        else {
            console.log('Invalid input');
        }

        document.getElementsByName('firstName')[0].value = '';
        document.getElementsByName('lastName')[0].value = '';
        document.getElementsByName('facultyNumber')[0].value = '';
        document.getElementsByName('grade')[0].value = '';

    }
}
solve();