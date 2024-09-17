import { loadBoard, pagination } from "./loadBoard.js";

$(document).ready(function () {

    const userProfile = () => {
        $.ajax({
            type: 'POST',
            url: '/userProfile', // 실제 사용자 정보를 제공하는 API 엔드포인트
            success: function (response) {
                // 서버에서 받은 사용자 정보를 HTML 요소에 삽입
                $('#user-name').text(response.name);
                $('#user-email').text(response.email);
                if (response.image) {
                    const arrayBuffer = new Uint8Array(response.image.data).buffer;
                    const blob = new Blob([arrayBuffer]); // 실제 이미지 MIME 타입으로 조정

                    // Blob URL 생성 및 이미지 표시
                    const imageUrl = URL.createObjectURL(blob);

                    $('#user-image').attr('src', imageUrl);
                } else {
                    $('#user-image').attr('src', '/images/default-profile.png'); // 기본 이미지
                }
            },
            error: function (xhr) {
                alert('사용자 정보를 로드하는 데 실패했습니다: ' + xhr.status + ' - ' + xhr.statusText);
                window.location.href = '/';
            }
        });
    }

    userProfile();

    $('#edit-profile').click(function () {
        $('.profile-info').css('display', 'none');
        $('#profile-name').val($('#user-name').text());
        $('#edit-profile-form').toggle();
    });


    $('#cancel-edit').click(function () {
        $('.profile-info').css('display', 'flex');
        $('#profile-name').val('');
        $('#edit-profile-form').hide();
    });


    $('#profile-form').submit(function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type: 'POST',
            url: '/updateProfile',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                alert(response.message);
                $('.profile-info').css('display', 'flex');
                $('#profile-name').val('');
                $('#edit-profile-form').hide();
                userProfile();
            },
            error: function (xhr) {
                alert('프로필 업데이트에 실패했습니다: ' + xhr.status + ' - ' + xhr.statusText);
            }
        });
    });

    pagination('pagination', 'myBoard', 5, false, true);

    loadBoard(5, 0, 'myBoard', false, true);
});