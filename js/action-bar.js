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

        },
        trashbin: function(event){
            this.trashModel = !this.trashModel
        },
        addItem: function(){

        },
        search: function(){
            alert(this.keyword)
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
