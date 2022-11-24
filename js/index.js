
$(document).ready(function () {
    $('.school-header a').click(function () {
        $(this).addClass('active').sibling().removeClass('active')
    })
})