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
    props: ['item', 'index'],
    template:
    '<tr>\
    <td><input type="checkbox" v-model="checked" @click="clickItem"/></td>\
    <td v-for="value in item" @click="clickItem">{{ value }}</td>\
    </tr>',
    methods: {
        clickItem: function(){
            this.checked = !this.checked
            this.$emit('click', [this.checked, this.item])
        }
    }
})

Vue.component('table-header', {
    props: ['headers'],
    template:
    '<tr>\
    <td v-if="headers != null">选择</td>\
    <td v-for="item in headers">{{ item }}</td>\
    </tr>'
})

var basic_table = new Vue({
    el: "#table_template",
    data: {
        itemArray: null,
        headers: null
    },
    methods: {
        clickItem: function(data){
            console.log(data)
        }
    }
})
