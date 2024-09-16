import hasSession from '/javascripts/hasSession.js';
import { loadBoard, pagination } from './loadBoard.js';

$('.btn').click(e=>{
    e.preventDefault();

    console.log()
});

const postsPerPage = 10;

document.addEventListener('DOMContentLoaded', async function() { 

    const navMenu = document.getElementById('nav-menu');

    const isLoggedIn = await hasSession();

    if (isLoggedIn) {
        navMenu.innerHTML = `
                <a href="/writeBoardPage">게시글 작성</a>
                <a href="/profile">내 프로필</a>
                <a href="/logout">로그아웃</a>
            `;
        
        userProfile();
    } else {
        navMenu.innerHTML = `
                <a href="/loginPage">로그인</a>
            `;
    }
    pagination('pagination', 'board-content', postsPerPage, true);
    loadBoard(postsPerPage, 0, 'board-content', true);

});



const userProfile = () => {
    $.ajax({
        type: 'POST',
        url: '/userProfile', // 실제 사용자 정보를 제공하는 API 엔드포인트
        success: function (response) {

            $('#pro').css('display', 'flex');

            // 서버에서 받은 사용자 정보를 HTML 요소에 삽입
            $('#nick').text(response.name);
            if (response.image) {
                const arrayBuffer = new Uint8Array(response.image.data).buffer;
                const blob = new Blob([arrayBuffer]); // 실제 이미지 MIME 타입으로 조정

                // Blob URL 생성 및 이미지 표시
                const imageUrl = URL.createObjectURL(blob);

                $('#photo').attr('src', imageUrl);
            } else {
                $('#photo').attr('src', '/images/default-profile.png'); // 기본 이미지
            }
        },
        error: function (xhr) {
            alert('사용자 정보를 로드하는 데 실패했습니다: ' + xhr.status + ' - ' + xhr.statusText);
            window.location.href = '/';
        }
    });
}
