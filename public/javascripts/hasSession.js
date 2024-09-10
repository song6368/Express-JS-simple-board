export default function hasSession() {
    return new Promise((res,rej)=>{
        $.ajax({
            type: 'POST', 
            url: '/hasSession',
            success: function(response) {
                res(response.hasSession);
            },
            error: function(xhr) {
                // XHR 객체의 상태와 응답 텍스트를 표시
                alert('요청에 실패했습니다: ' + xhr.status + ' - ' + xhr.statusText);
            }
        });
    })
}