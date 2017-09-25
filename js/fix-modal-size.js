var fixSize = function(){
    var body_height = $('body').height()
    var container_height = (body_height * 90) / 100 - 20
    var height = (container_height * 1) / 10 - 10
    var modal_body_height = (container_height * 8) / 10 - 10
    $('#modal_container').css('max-height', container_height)
    $('#modal_header').css('max-height', height)
    $('#modal_footer').css('max-height', height)
    $('#modal_body').css('max-height', modal_body_height)
}

$(window).resize(function () {
    fixSize()
});

$(document).ready(function(){
    fixSize()
    refresh()
})
