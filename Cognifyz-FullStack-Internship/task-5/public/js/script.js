// API URL
const apiUrl = "/api/students";

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const submitBtn = document.getElementById("submitBtn");
const studentId = document.getElementById("studentId");

// Load students
async function loadStudents() {

    const response = await fetch(apiUrl);
    const students = await response.json();

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `
        <tr>
            <td>${student.fullname}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.age}</td>
            <td>${student.city}</td>
            <td>${student.course}</td>
            <td>${student.gender}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editStudent(${student.id})">

                    Edit

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteStudent(${student.id})">

                    Delete

                </button>

            </td>

        </tr>
        `;

    });

}

// Add / Update Student
form.addEventListener("submit", async function(e){

    e.preventDefault();

    const student = {

        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        age: document.getElementById("age").value,
        city: document.getElementById("city").value,
        course: document.getElementById("course").value,
        gender: document.querySelector('input[name="gender"]:checked').value

    };

    if(studentId.value){

        await fetch(`${apiUrl}/${studentId.value}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(student)

        });

        submitBtn.innerText = "Add Student";

        studentId.value = "";

    }

    else{

        await fetch(apiUrl,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(student)

        });

    }

    form.reset();

    loadStudents();

});

// Delete Student
async function deleteStudent(id){

    if(confirm("Are you sure you want to delete this student?")){

        await fetch(`${apiUrl}/${id}`,{

            method:"DELETE"

        });

        loadStudents();

    }

}

// Edit Student
async function editStudent(id){

    const response = await fetch(apiUrl);

    const students = await response.json();

    const student = students.find(s => s.id === id);

    if(!student) return;

    studentId.value = student.id;

    document.getElementById("fullname").value = student.fullname;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;
    document.getElementById("age").value = student.age;
    document.getElementById("city").value = student.city;
    document.getElementById("course").value = student.course;

    document.querySelector(
        `input[name="gender"][value="${student.gender}"]`
    ).checked = true;

    submitBtn.innerText = "Update Student";

}

// Initial Load
loadStudents();