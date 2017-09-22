var dataMap = null

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

var saveData = function(page, table_data, addition_data){
    if (dataMap == null){
        dataMap = new Map()
    }
    dataMap.set(page, buildStorageObject(table_data, addition_data))
}

var getTableData = function(page, number){
    return dataMap != null && dataMap.has(page) ? dataMap.get(page)["table"][number] : false
}

var getAdditionData = function(page, number){
    return dataMap != null && dataMap.has(page) ? dataMap.get(page)["addition"][number] : false
}

var getInfos = function(page, number){
    return resetInfo(getTableData(page, number), getAdditionData(page, number))
}

var buildInfoObject = function(name, value){
    return {name: name, value: value}
}

var buildStorageObject = function(table, addition){
    return {table: table, addition: addition}
}
