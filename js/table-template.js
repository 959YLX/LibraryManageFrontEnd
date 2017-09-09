function createBooks(number){
    var books = []
    for( var i = 0; i < number; i++){
        books.push({name: "Tome", age: i + 18, sex: "man"})
    }
    return books
}

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
                this.$emit('add', [this.index])
            }else{
                this.$emit('delete', [this.index])
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
        selectAll: false
    },
    methods: {
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
        }
    }
})
