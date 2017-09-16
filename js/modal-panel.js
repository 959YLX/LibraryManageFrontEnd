Vue.component('my-modal', {
    template: '\
      <transition name="modal">\
        <div class="modal-mask">\
          <div class="modal-wrapper">\
            <div class="modal-container" id="modal_container">\
              <div class="modal-header text-center" id="modal_header">\
                <slot name="header"></slot>\
              </div>\
              <div class="modal-body" id="modal_body">\
                <slot name="body"></slot>\
              </div>\
              <div class="modal-footer" id="modal_footer">\
                <slot name="footer"></slot>\
              </div>\
            </div>\
          </div>\
        </div>\
      </transition>'
})

Vue.component('info-item', {
    props: ['name', 'value', 'edit'],
    template: '\
               <div>\
                 <span class="left-item">{{ name }}:</span>\
                 <span class="right-item" v-show="!edit">{{ value }}</span>\
                 <input class="right-item text-right" v-if="edit" :value="value"/>\
               </div>'
})

Vue.component('delete-item', {
    props: ['names', 'complete'],
    template: '\
               <div>\
                 <span class="text-center">确定要删除图书:<span class="text-warning" v-for="name in names"> {{ name }} </span>吗  <span v-show="complete" class="text-danger">(此删除不可恢复)</span></span>\
               </div>'
})

Vue.component('message-item', {
    props: ['message'],
    template: '\
                <div>\
                    <span class="text-center text-info message-text">{{ message }}</span>\
                </div>'
})

Vue.component('select-type', {
    template: '\
                <div>\
                    <button class="btn btn-lg btn-default select-button-left" @click="$emit(\'book\')">导入书本信息</button>\
                    <button class="btn btn-lg btn-default select-button-right" @click="$emit(\'magazine\')">导入期刊信息</button>\
                    <button class="btn btn-lg btn-default select-button-file" @click="$emit(\'file\')">从文件导入</button>\
                    <input type="file" id="myFile" v-show="false" @change="choseFile"/>\
                </div>',
    methods: {
        choseFile: function(){
            console.log($('#myFile').get(0).files[0])
        }
    }
})

var info_modal = new Vue({
    el: '#info_modal',
    data: {
        showModal: false,
        showItem: false,
        showDelete: false,
        showMessage: false,
        showSelect: false,
        trashModel: false,
        editModal: false,
        deleteItemNames: null,
        itemArray: null,
        infoHeader: '',
        message: '',
        booksInfo: table_header.concat(book_addtion),
        magazineInfo: table_header.concat(magazine_addtion)
    },
    methods: {
        enter: function(){
            this.showModal = false
            //按下了确定
            if (this.showDelete){
                //请求接口
            }
        },
        cancel: function(){
            this.showModal = false
            //按下了取消
        },
        edit: function(){
            this.editModal = true
            //按下了编辑
        },
        importInfo: function(type){
            this.showSelect = false
            var item = []
            if (type == "book"){
                this.booksInfo.forEach(function(info){
                    item.push({name: info, value: null})
                })
            }else if(type == "magazine"){
                this.magazineInfo.forEach(function(info){
                    item.push({name: info, value: null})
                })
            }
            this.itemArray = item
            this.editModal = true
            this.showItem = true
        },
        openFile: function(){
            $('#myFile').trigger('click')
        },
        showInfoModal: function(header, info){
            this.clearStatus()
            this.infoHeader = header
            // this.itemArray = info
            this.showItem = true
            this.showModal = true
        },
        showDeleteModal: function(header, data, trashModel){
            this.clearStatus()
            this.infoHeader = header
            this.deleteItemNames = data
            this.trashModel = trashModel
            this.showDelete = true
            this.showModal = true
        },
        showMessageModal: function(header, message){
            this.clearStatus()
            this.infoHeader = header
            this.message = message
            this.showModal = true
        },
        showAddModal: function(header, booksInfo, magazineInfo){
            this.clearStatus()
            this.infoHeader = header
            this.booksInfo = booksInfo
            this.magazineInfo = magazineInfo
            this.showSelect = true
            this.showModal = true
        },
        clearStatus: function(){
            this.showItem = false
            this.showDelete = false
            this.showMessage = false
            this.showSelect = false
            this.editModal = false
        }
    },
    computed: {
        showCancel: function(){
            return this.showDelete || this.showSelect || this.editModal
        },
        showEdit: function(){
            return this.showItem && !this.editModal
        },
        showEnter: function(){
            return !this.showSelect
        }
    }
})
