import hasSession from '/javascripts/hasSession.js';

$('.btn').click(e=>{
    e.preventDefault();

    console.log()
})

window.onload = async () => {
    const navMenu = document.getElementById('nav-menu');

    const isLoggedIn = await hasSession();

    if (isLoggedIn) {
        navMenu.innerHTML = `
                <a href="/writeBoardPage">게시글 작성</a>
                <a href="/profile">내 프로필</a>
                <a href="/logout">로그아웃</a>
            `;
    } else {
        navMenu.innerHTML = `
                <a href="/loginPage">로그인</a>
            `;
    }

    $.ajax({
        url: '/loadBoard',
        type: 'POST',
        data: {
            'cnt': 5,
            'offset': 0
        },
        success: (res) => {
            res.forEach(e => {
                const id = e.id;
                const title = e.title;
                const author = e.author;
                const created_at = e.created_at;

                $('#board-content').append(
                    `
                    <form action="/boardDetail" method="post">
                        <div class="post">
                            <h2>${title}</h2>
                            <p>작성자: ${author} | 작성일: ${created_at}</p>
                            <input style="display:none" name="id" value=${id}>
                            <button type="submit" class="btn">자세히 보기</button>
                        </div>
                    </form>
                    `
                );
            });
        }
    });

};