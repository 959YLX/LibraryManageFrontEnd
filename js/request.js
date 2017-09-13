var hostname = "http://localhost/librarymanage"

var GET = "get"
var POST = "post"

var api_get_list = "/getList"
var api_get_header = "/getHeader"
var api_delete = "/delete"
var api_search = "/search"
var api_add = "/add"
var api_recover = "/recover"

var dataType = "json"

var refreshPage = 1

var successHeader = "成功"
var errorHeader = "错误"
var api_error_message = "接口调用错误"

var refresh = function(basic_table, info_modal, action_bar){
    getList(basic_table, info_modal, action_bar, refreshPage)
}

var getList = function(basic_table, info_modal, action_bar, page){
    var url = hostname + api_get_list
    var data = {trashModel: action_bar.trashModel, page: page}
    var callback = function(response, args){
        var basic_table = args[0]
        basic_table.setItemList(response.total, response.current, response.list)
    }
    sendRequest(url, data, GET, info_modal, callback, [basic_table])
}

var getHeader = function(){
    var url = hostname + api_get_header
    var callback = function(response, args){
        var basic_table = args[0]
        var info_modal = args[1]
        basic_table.headers = response.table
        info_modal.booksInfo = response.book
        info_modal.magazineInfo = response.magazine
    }
    sendRequest(url, null, GET, info_modal, callback, [basic_table, info_modal])
}

var deleteItems = function(){
    var url = hostname + api_delete
    var deleteId = basic_table.getChonseItemName()
    var data = {id: deleteId}
    var callback = function(response, args){
        info_modal.showMessageModal(successHeader, "删除成功")
        refresh(args[0], args[1], args[2])
    }
    sendRequest(url, data, POST, info_modal, callback, [basic_table, info_modal, action_bar])
}

var search = function(keyword){
    var url = hostname + api_search
    var data = {trashModel: action_bartrashModel, keyword: keyword}
    var callback = function(response, args){
        var basic_table = args[0]
        basic_table.setItemList(response.total, response.current, response.list)
    }
    sendRequest(url, data, GET, info_modal, callback, [basic_table])
}

var addItemInfo = function(type, item){
    var url = hostname + api_add
    var data = {type: type, obj: item}
    var callback = function(response, args){
        var info_modal = args[1]
        info_modal.showMessageModal(successHeader, "增加成功")
        refresh(args[0], info_modal, args[2])
    }
    sendRequest(url, data, POST, info_modal, callback, [basic_table, info_modal, action_bar])
}

var recoverItem = function(){
    var ids = basic_table.getChonseItemName()
    var url = hostname + api_recover
    var data = {id: ids}
    var callback = function(response, args){
        var basic_table = args[0]
        var info_modal = args[1]
        var action_bar = args[2]
        info_modal.showMessage(successHeader, "恢复成功")
        action_bar.trashModel = false
        refresh(basic_table, info_modal, action_bar)
    }
    sendRequest(url, data, POST, info_modal, callback, [basic_table, info_modal, action_bar])
}

var sendRequest(url, data, method, info_modal, callback, args){
    $.ajax({
        type: method,
        url: url,
        data: data,
        dataType: dataType,
        complete: function(response, status){
            if (status != "success" || response.code != 0){
                info_modal.showMessageModal(errorHeader, status == "success" ? response.msg : api_error_message)
            }else{
                callback(response, args)
            }
        }
    })
}
