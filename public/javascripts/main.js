import hasSession from '/javascripts/hasSession.js';

document.addEventListener('DOMContentLoaded', async () => {
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
});