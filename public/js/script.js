$(document).ready(function () {

  $('#submit-btn').click(function(e) {
    e.preventDefault()

    var formData = {
      fullName: $('input[name="fullName"]').val(),
      message: $('textarea[name="message"]').val(),
      email: $('input[name="email"]').val()
    }

    $.ajax({
      type: 'post',
      url: '/sendemail',
      dataType: 'json',
      data: formData
    })

    $('.result').append("Email sent!")
  })
})
