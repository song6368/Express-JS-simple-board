function showSignUpForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signUpForm').style.display = 'none';
}

function triggerButtonOnEnter(container, button) {
    $(container + " input").on("keyup", function(key) {
        if (key.keyCode == 13) {
            $(button).click();
        }
    });
}

triggerButtonOnEnter("#login", "#loginBtn");
triggerButtonOnEnter("#signUp", "#signUpBtn");


$('#signUpBtn').click(() => {

    var formData = {
        name: $('#signUp #name').val(),
        email: $('#signUp #email').val(),
        password: $('#signUp #password').val()
    };

    $.ajax({
        type: 'POST',
        url: '/signup',
        data: formData,
        success: function (response) {
            if(!response.success){
                alert(response.errorMessage);
            } else {
                alert(response.successMessage);
                window.location.href='loginPage';
            }
        },
        error: function (xhr) {
            alert(xhr); // 에러 메시지 표시
        }
    });
});

$('#loginBtn').click(() => {

    var formData = {
        email: $('#login #email').val(),
        password: $('#login #password').val()
    };

    $.ajax({
        type: 'POST',
        url: '/login',
        data: formData,
        success: function (response) {
            if(!response.success){
                alert(response.errorMessage);
            } else {
                alert(response.successMessage);
                window.location.href = '/';
            }
        },
        error: function (xhr) {
            alert(xhr); // 에러 메시지 표시
        }
    });
});