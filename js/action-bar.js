var trashButtonName = '回收站'
var backItemListButtonName = '列表'
var addItemButtonName = '增加'
var recoverItemButtonName = '恢复'
var deleteHeader = '删除'

var action_bar = new Vue({
    el: '#action_bar',
    data: {
        trashModel: false,
        searchModel: false,
        keyword: ''
    },
    methods: {
        refresh: function(){
            refresh()
        },
        trashbin: function(event){
            this.trashModel = !this.trashModel
            refresh()
        },
        addItem: function(){
            if (this.trashModel){
                recoverItem()
            }else{
                info_modal.showAddModal(addItemButtonName)
            }
        },
        search: function(){
            //搜索
            console.log("刷新:keyword = " + this.keyword)
            if (this.keyword == "" || this.keyword == null){
                refresh()
            }else{
                this.searchModel = true
                search(this.keyword)
            }
        },
        deleteItem: function(){
            info_modal.showDeleteModal(deleteHeader, basic_table.getChosenItemName(), this.trashModel)
        },
        exportItem: function(){
            exportItem(this.trashModel)
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
