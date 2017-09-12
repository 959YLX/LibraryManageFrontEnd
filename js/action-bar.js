var trashButtonName = '回收站'
var backItemListButtonName = '列表'
var addItemButtonName = '增加'
var recoverItemButtonName = '恢复'
var deleteHeader = '删除'

var action_bar = new Vue({
    el: '#action_bar',
    data: {
        trashModel: false,
        keyword: ''
    },
    methods: {
        refresh: function(){
            //刷新
            console.log("刷新")
        },
        trashbin: function(event){
            this.trashModel = !this.trashModel
            console.log("切换到回收站模式")
        },
        addItem: function(){
            if (this.trashModel){
                //恢复
                console.log("恢复" + basic_table.getChonseItemName().toString())
            }else{
                info_modal.showAddModal(addItemButtonName, [], [])
            }
        },
        search: function(){
            //搜索
            console.log("刷新:keyword = " + this.keyword)
        },
        deleteItem: function(){
            info_modal.showDeleteModal(deleteHeader, basic_table.getChonseItemName(), this.trashModel)
        }
    },
    computed: {
        trashName: function(){
            return this.trashModel ? backItemListButtonName : trashButtonName
        },
        addItemName: function(){
            return this.trashModel ? recoverItemButtonName : addItemButtonName
        }
    }
})
