// var default_header = ['编号', '名称', '分类号', '借出数量', '库存数量', '出版时间', '出版单位', '价格']

Vue.component('table-item', {
    data: function(){
        return {
            checked: false
        }
    },
    props: ['item', 'index', 'selectall'],
    template:
    '<tr>\
    <td><input type="checkbox" v-model="checked"/></td>\
    <td class="text-center" v-for="value in item" @click="clickItem">{{ value }}</td>\
    </tr>',
    methods: {
        clickItem: function(){
            info_modal.showInfoModal(this.item.name, null)
        }
    },
    watch: {
        selectall(val){
            if (val){
                if (!this.checked){
                    this.checked = true
                }
            }
        },
        checked(val){
            if (val) {
                this.$emit('select', [this.index])
            }else{
                this.$emit('cancel', [this.index])
            }
        }
    }
})

Vue.component('table-header', {
    data: function(){
        return {
             choseAll: false
        }
    },
    props: ['headers', 'chose'],
    template:
    '<tr>\
    <td v-if="headers != null"><input type="checkbox" v-model="choseAll" @click="selectAll"/></td>\
    <td class="text-center" v-for="item in headers">{{ item }}</td>\
    </tr>',
    methods:{
        selectAll: function(){
            this.$emit('click')
        }
    },
    watch: {
        chose(val){
            this.choseAll = val
        }
    }
})

var basic_table = new Vue({
    el: "#table_template",
    data: {
        itemArray: null,
        headers: null,
        chosen: null,
        selectAll: false,
        total_page: 1,
        current_page: 1
    },
    methods: {
        setItemList: function(total_page, current_page, current_list){
            this.current_page = current_page
            this.total_page = total_page
            this.itemArray = current_list
        },
        clickItem: function(data){
            console.log(data)
        },
        choseItem: function(data){
            if (this.chosen == null) {
                this.chosen = new Set()
            }
            this.chosen.add(data[0])
            if (this.itemArray.length == this.chosen.size && !this.selectAll){
                this.selectAll = true
            }
        },
        removeItem: function(data){
            this.chosen.delete(data[0])
            if (this.selectAll){
                this.selectAll = false
            }
        },
        choseAll: function(){
            this.selectAll = !this.selectAll
            this.$children.forEach(function(child, index){
                if (index != 0){
                child.checked = false
                }
            })
        },
        getChonseItemName: function(){
            var temp = []
            var tables = this
            this.chosen.forEach(function(element){
                temp.push(tables.itemArray[element].name)
            })
            return temp
        },
        after: function(){

        },
        next: function(){

        }
    },
    computed: {
        showBefore: function(){
            return this.current_page > 1
        },
        showAfter: function(){
            return this.total_page != this.current_page
        }
    }
})
