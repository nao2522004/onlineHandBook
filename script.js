// Xử lý logic cho trang môn học

function addNote() {
    // Hàm thêm ghi chú mới
    var noteTitle = prompt('Nhập tiêu đề ghi chú:');
    if (noteTitle) {
        var noteList = document.getElementById('note-list');
        var newNote = document.createElement('li');
        newNote.textContent = noteTitle;
        newNote.onclick = function () {
            viewNoteDetail(noteTitle);
        };
        noteList.appendChild(newNote);
    }
}

function viewNoteDetail(noteTitle) {
    // Hàm xem chi tiết ghi chú
    alert('Xem chi tiết ghi chú: ' + noteTitle);
}

 // Mảng lưu trữ danh sách môn học
 var subjects = ['Toán', 'Văn', 'Lý'];

 // Hàm hiển thị danh sách môn học
 function displaySubjects() {
    var subjectList = document.getElementById('subject-list');
    subjectList.innerHTML = '';

    for (var i = 0; i < subjects.length; i++) {
        var newSubject = document.createElement('li');
        newSubject.textContent = subjects[i];

        // Thêm nút "Xóa" cho mỗi môn học
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa';
        deleteButton.onclick = function (index) {
            return function (event) {
                event.stopPropagation(); // Ngăn chặn sự kiện click từ lan ra các phần tử cha
                deleteSubject(index);
            };
        }(i);

        newSubject.appendChild(deleteButton);

        newSubject.onclick = function (index) {
            return function () {
                viewSubject(subjects[index]);
            };
        }(i);

        subjectList.appendChild(newSubject);
    }
}


// Hàm xóa môn học theo chỉ mục
function deleteSubject(index) {
    var confirmDelete = confirm('Bạn có chắc chắn muốn xóa môn học này?');
    if (confirmDelete) {
        // Xóa môn học khỏi mảng subjects
        subjects.splice(index, 1);

        // Lưu danh sách môn học vào Local Storage
        saveSubjectsToLocal();

        // Hiển thị danh sách môn học
        displaySubjects();
    }
}


 // Hàm thêm môn học mới
 function addSubject() {
    var newSubject = prompt('Nhập tên môn học:');
    if (newSubject) {
        // Thêm môn học mới vào mảng subjects
        subjects.push(newSubject);

        // Lưu danh sách môn học vào Local Storage
        saveSubjectsToLocal();

        // Hiển thị danh sách môn học
        displaySubjects();
    }
}

// Hàm lưu danh sách môn học vào Local Storage
function saveSubjectsToLocal() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

// Hàm lấy danh sách môn học từ Local Storage khi trang được tải
function loadSubjectsFromLocal() {
    var storedSubjects = localStorage.getItem('subjects');
    if (storedSubjects) {
        subjects = JSON.parse(storedSubjects);
    }
}

// Gọi hàm này khi trang được tải để nạp danh sách môn học từ Local Storage
loadSubjectsFromLocal();



 // Hàm xem môn học
 function viewSubject(subject) {
     // Chuyển đến trang cho môn học cụ thể
     window.location.href = 'subject.html?name=' + encodeURIComponent(subject);
 }

 // Hiển thị danh sách môn học khi trang được tải
 displaySubjects();

 



