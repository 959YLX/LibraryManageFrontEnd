var hostname = "api"

var GET = "get"
var POST = "post"

var api_get_list = "/getList"
var api_get_header = "/getHeader"
var api_delete = "/delete"
var api_search = "/search"
var api_add = "/add"
var api_recover = "/recover"
var api_upload = "/upload"
var api_export = "/export"

var dataType = "json"

var refreshPage = 1

var successHeader = "成功"
var errorHeader = "错误"
var api_error_message = "接口调用错误"

var refresh = function(){
    action_bar.searchModel = false
    deleteCache(action_bar.trashModel, false)
    deleteCache(false, true)
    deleteCache(true, true)
    getList(refreshPage)
}

var getList = function(page){
    var url = hostname + api_get_list
    var data = {trash: action_bar.trashModel, page: page}
    var callback = function(response, args){
        var basic_table = args[0]
        var saveData = args[1]
        var trashModel = args[2]
        saveData(response.data.current, response.data.table, response.data.addition)
        basic_table.setItemList(response.data.total, response.data.current, response.data.table)
    }
    sendRequest(url, data, GET, info_modal, callback, [basic_table, saveData, action_bar.trashModel])
}

var deleteItems = function(){
    var url = hostname + api_delete
    var deleteId = basic_table.getChosenItemId()
    var contain = ""
    deleteId.forEach(function(id){
        contain += (id + ",")
    })
    var data = {ids: contain}
    var callback = function(response, args){
        var info_modal = args[0]
        info_modal.showMessageModal(successHeader, "删除成功")
        refresh()
    }
    sendRequest(url, data, POST, info_modal, callback, [info_modal])
}

var search = function(keyword, page){
    var url = hostname + api_search
    var data = {trash: action_bar.trashModel, keyword: keyword, page: page}
    var callback = function(response, args){
        var basic_table = args[0]
        saveData(response.data.current, response.data.table, response.data.addition)
        basic_table.setItemList(response.data.total, response.data.current, response.data.table)
    }
    sendRequest(url, data, GET, info_modal, callback, [basic_table])
}

var addItemInfo = function(item){
    var url = hostname + api_add
    var data = item
    var callback = function(response, args){
        var info_modal = args[0]
        info_modal.showMessageModal(successHeader, "增加成功")
        refresh()
    }
    sendRequest(url, data, POST, info_modal, callback, [info_modal])
}

var recoverItem = function(){
    var ids = basic_table.getChosenItemId()
    if (ids.length == 0){
        return
    }
    var url = hostname + api_recover
    var contain = ""
    ids.forEach(function(id){
        contain += (id + ",")
    })
    var data = {ids: contain}
    var callback = function(response, args){
        var info_modal = args[0]
        var action_bar = args[1]
        info_modal.showMessageModal(successHeader, "恢复成功")
        action_bar.trashModel = false
        refresh()
    }
    sendRequest(url, data, POST, info_modal, callback, [info_modal, action_bar])
}

var exportItem = function(trash){
    var url = hostname + api_export
    var param = "?trash=" + trash
    window.open(url + param)
}

var upload = function(){
    var url = hostname + api_upload
    var formData = new FormData()
    formData.append('file', $("#myFile")[0].files[0])
    $.ajax({
        url: url,
        type: POST,
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
        complete: function(status){
            if (status == "success"){
                info_modal.showMessageModal(successHeader, "上传成功")
                refresh()
            }
        }
    })
}

var buildPackage = function(type, infos){
    var data = {type: type, id: infos.id, name: infos.name, classicIndex: infos.classicIndex, inventory: infos.inventory,
                borrowedNumber: infos.borrowedNumber, publicationYear: infos.publicationYear, publisher: infos.publisher,
                price: infos.price}
    if (type == "book"){
        data["ISBN"] = infos.ISBN
        data["editor"] = infos.editor
        data["pageCount"] = infos.pageCount
        data["letterCount"] = infos.letterCount
    }else if(type == "magazine"){
        data["ISSN"] = infos.ISSN
        data["ISDNumber"] = infos.ISDNumber
        data["subject"] = infos.subject
        data["impactFactor"] = infos.impactFactor
        data["publishingCycle"] = infos.publishingCycle
        data["papers"] = infos.papers
    }
}

var sendRequest = function(url, data, method, info_modal, callback, args){
    $.ajax({
        type: method,
        url: url,
        data: data,
        dataType: dataType,
        complete: function(response, status){
            var data = response.responseJSON
            if (status != "success" || data.code != 0){
                info_modal.showMessageModal(errorHeader, status == "success" ? data.msg : api_error_message)
            }else{
                callback(data, args)
            }
        }
    })
}
