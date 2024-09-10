$('#back').click(() => {
    window.location.href = '/';
})

const contentArea = document.getElementById('content');

contentArea.addEventListener('dragover', function (event) {
    event.preventDefault();
});

contentArea.addEventListener('drop', function (event) {
    event.preventDefault();

    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // 이미지를 contenteditable div에 삽입
            const imgTag = `<img src="${e.target.result}" alt="Uploaded Image">`;
            contentArea.innerHTML += imgTag;
        };

        reader.readAsDataURL(files[0]); // 이미지를 읽고 미리보기 URL 생성
    }
});