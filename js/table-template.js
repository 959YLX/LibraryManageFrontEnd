var table_header = ['编号', '名称', '分类号', '库存数量', '借出数量', '出版时间', '出版单位', '价格']
var book_addtion = ['ISBN', '作者', '页数', '字数']
var magazine_addtion = ['ISSN', '检索', '学科领域', '影响因子', '出版周期', '每期论文数']
var book_addtion_preprice = ['每千字价格']
var magazine_addtion_avgprice = ['平均单篇论文价格']

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
    <td class="text-center" v-for="value in item" @click="$emit(\'show\', [index])">{{ value }}</td>\
    </tr>',
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
        headers: table_header,
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
        showInfo: function(data){
            var index = data[0]
            info_modal.showInfoModal(this.itemArray[index].name, getInfos(this.current_page, index))
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
            var tables = this
            this.chosen.forEach(function(element){
                temp.push(tables.itemArray[element].name)
            })
            return temp
        },
        before: function(){

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
