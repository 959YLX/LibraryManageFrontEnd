var dataMap = null

var trash_search_page = 0
var trash_nosearch_page = 0
var default_search_page = 0
var default_nosearch_page = 0

var resetInfo = function(table_info, addtionInfo){
    var contain = []
    var header = table_header
    var index = 0
    if (addtionInfo["type"] == "book") {
        header = header.concat(book_addtion).concat(book_addtion_preprice)
    }else{
        header = header.concat(magazine_addtion).concat(magazine_addtion_avgprice)
    }
    for (var key in table_info) {
        contain.push(buildInfoObject(header[index], table_info[key]))
        index += 1
    }
    for (var key in addtionInfo){
        if (key == "type") {
            continue
        }
        contain.push(buildInfoObject(header[index], addtionInfo[key]))
        index += 1
    }
    return contain
}


var updateInfo = function(infos, type){
    var updateContain = {type: type}
    if (type == "book") {
        for (var key in infos){
            updateContain[book_param[key]] = infos[key]
        }
    }else {
        for (var key in infos){
            updateContain[magazine_param[key]] = infos[key]
        }
    }
    return updateContain
}

var saveData = function(page, table_data, addition_data){
    if (dataMap == null){
        dataMap = new Map()
    }
    dataMap.set(getIndexName(page), buildStorageObject(table_data, addition_data))
}

var getTable = function(page){
    var index = getIndexName(page)
    return dataMap.get(index)["table"]
}

var getTableData = function(page, number){
    var index = getIndexName(page)
    return dataMap != null && dataMap.has(index) ? dataMap.get(index)["table"][number] : false
}

var getAdditionData = function(page, number){
    var index = getIndexName(page)
    return dataMap != null && dataMap.has(index) ? dataMap.get(index)["addition"][number] : false
}

var getInfos = function(page, number){
    return resetInfo(getTableData(page, number), getAdditionData(page, number))
}

var getType = function(page, number){
    return getAdditionData(page, number)["type"]
}

var buildInfoObject = function(name, value){
    return {name: name, value: value}
}

var buildStorageObject = function(table, addition){
    return {table: table, addition: addition}
}

var hasCache = function(page){
    return dataMap.has(getIndexName(page))
}

var getIndexName = function(page){
    var start = action_bar.trashModel ? "TRASH_" : "DEFAULT_"
    var middle = action_bar.searchModel ? "SEARCH_" : "NOSEARCH_"
    return start + middle + page
}

var deleteCache = function(trash, search){
    if (dataMap == null){
        return
    }
    var start = trash ? "TRASH_" : "DEFAULT_"
    var middle = search ? "SEARCH_" : "NOSEARCH_"
    var prefix = start + middle
    var index = 1
    while(dataMap.delete(prefix + index)){
        index += 1
    }
}
