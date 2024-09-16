const loadBoard = (cnt, offset, tagId, notForEmail) => {
    $.ajax({
        url: '/loadBoard',
        type: 'POST',
        data: {
            'cnt': cnt,
            'offset': offset,
            'notForEmail': notForEmail
        },
        success: (res) => {
            $('#' + tagId).html('');

            res.forEach(e => {
                const id = e.id;
                const title = e.title;
                const author = e.author;
                const created_at = e.created_at;

                console.log(id);

                $('#'+tagId).append(
                    `
                    <form action="/boardDetail" method="post">
                        <button type="submit" class="post">
                            <h2>${title}</h2>
                            <p>${author}<br/>${created_at}</p>
                            <input style="display:none" name="id" value=${id}>
                        </button>
                    </form>
                    `
                );
            });
        }
    });
}

const pagination = (tagId, tagId2, postsPerPage, notForEmail) => {
    
    $.ajax({
        url: '/boardCount',
        type: 'POST',
        data: {
            notForEmail : notForEmail
        },
        success: (res) => {
            const totalPosts = res.count; // Assuming your response has a total field

            const totalPages = Math.ceil(totalPosts / postsPerPage);

            // Generate pagination links
            let paginationHtml = '';
            for (let i = 1; i <= totalPages; i++) {
                paginationHtml += `<li><a href="#" data-page="${i}">${i}</a></li>`;
            }

            $('#'+tagId).html(paginationHtml);

            // Handle page click
            $('#'+tagId).on('click', 'a', function (event) {
                event.preventDefault();
                const page = $(this).data('page');
                loadBoard(postsPerPage, (page - 1) * postsPerPage, tagId2, notForEmail);
            });
        }
    })
};

export { loadBoard, pagination }