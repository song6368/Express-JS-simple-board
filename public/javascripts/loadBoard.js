const loadBoard = (cnt, offset, tagId, notForEmail, delBtn) => {
    $.ajax({
        url: '/loadBoard',
        type: 'POST',
        data: {
            'cnt': cnt,
            'offset': offset,
            'notForEmail': notForEmail
        },
        success: (res) => {
            $('#' + tagId).html('');  // Clear the current content of the element

            res.forEach(e => {
                const id = e.id;
                const title = e.title;
                const author = e.author;
                const created_at = e.created_at;

                if (delBtn) {
                    $('#' + tagId).append(
                        `
                        <div class="post-container">
                            <form action="/boardDetail" method="post">
                                <button type="submit" class="post">
                                    <h2>${title}</h2>
                                    <p>${author}<br/>${created_at}</p>
                                    <input type="hidden" name="id" value="${id}">
                                </button>
                            </form>
                            <form action="/deletePost" method="post" class="delete-form">
                                <input type="hidden" name="id" value="${id}">
                                <button type="submit" class="delete-btn">Delete</button>
                            </form>
                        </div>
                        `
                    );
                } else {
                    $('#' + tagId).append(
                        `
                        <form action="/boardDetail" method="post">
                            <button type="submit" class="post">
                                <h2>${title}</h2>
                                <p>${author}<br/>${created_at}</p>
                                <input type="hidden" name="id" value="${id}">
                            </button>
                        </form>
                        `
                    );
                }
            });
        }
    });
}

const pagination = (tagId, tagId2, postsPerPage, notForEmail, delBtn) => {
    $.ajax({
        url: '/boardCount',
        type: 'POST',
        data: {
            notForEmail: notForEmail
        },
        success: (res) => {
            const totalPosts = res.count; 
            const totalPages = Math.ceil(totalPosts / postsPerPage);
            const pagesPerGroup = 5; // 한 그룹에 보여줄 페이지 수
            let currentGroup = 1;

            const renderPagination = (group) => {
                const startPage = (group - 1) * pagesPerGroup + 1;
                const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

                let paginationHtml = '';

                // '이전' 버튼
                if (group > 1) {
                    paginationHtml += `<li><a href="#" class="prev"><</a></li>`;
                }

                // 페이지 번호
                for (let i = startPage; i <= endPage; i++) {
                    paginationHtml += `<li><a href="#" data-page="${i}">${i}</a></li>`;
                }

                // '다음' 버튼
                if (endPage < totalPages) {
                    paginationHtml += `<li><a href="#" class="next">></a></li>`;
                }

                $('#' + tagId).html(paginationHtml);
            };

            // 첫 그룹 렌더링
            renderPagination(currentGroup);

            // 페이지 클릭 처리
            $('#' + tagId).on('click', 'a', function (event) {
                event.preventDefault();
                const $this = $(this);

                if ($this.hasClass('prev')) {
                    currentGroup--;
                    renderPagination(currentGroup);
                } else if ($this.hasClass('next')) {
                    currentGroup++;
                    renderPagination(currentGroup);
                } else {
                    const page = $this.data('page');
                    loadBoard(postsPerPage, (page - 1) * postsPerPage, tagId2, notForEmail, delBtn);
                }
            });
        }
    });
};

export { loadBoard, pagination }