$('#back').click(() => {
    window.location.href = '/';
});

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
            // 이미지와 리사이즈 핸들러를 포함한 컨테이너
            const container = document.createElement('div');
            container.classList.add('resize-container');
            container.setAttribute('contenteditable', 'false');
            
            const imgTag = `<img src="${e.target.result}" alt="Uploaded Image" />`;
            container.innerHTML = imgTag;
            
            const resizeHandle = document.createElement('span');
            resizeHandle.classList.add('resize-handle', 'br');
            container.appendChild(resizeHandle);
            
            contentArea.appendChild(container);

            // 리사이즈 핸들 드래그 기능
            let isResizing = false;

            resizeHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isResizing = true;
                document.addEventListener('mousemove', resizeImage);
                document.addEventListener('mouseup', () => {
                    isResizing = false;
                    document.removeEventListener('mousemove', resizeImage);
                });
            });

            function resizeImage(e) {
                if (!isResizing) return;
                const img = container.querySelector('img');
                const rect = img.getBoundingClientRect();
                img.style.width = e.clientX - rect.left + 'px';
                img.style.height = e.clientY - rect.top + 'px';
            }
        };

        reader.readAsDataURL(files[0]); // 이미지를 읽고 미리보기 URL 생성
    }

    const contentArea = document.getElementById('content');

    contentArea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.execCommand('insertHTML', false, '<br><br>');
        }
    });
});
