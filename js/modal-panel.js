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
    data: function(){
        return {
            myValue: this.value
        }
    },
    props: ['name', 'value', 'edit', 'close', 'index'],
    template: '\
               <div>\
                 <span class="left-item">{{ name }}:</span>\
                 <span class="right-item" v-show="showText">{{ value }}</span>\
                 <input class="right-item text-right" v-if="!showText" v-model="myValue"/>\
               </div>',
    watch: {
        close(){
            this.$emit("final-value", [this.index, this.myValue])
        },
        value(val){
            this.myValue = val
        }
    },
    computed: {
        showText: function(){
            return (!this.edit || (this.index == 0 && this.value != null))
        }
    }
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
                    <input type="file" id="myFile" v-show="false" @change="$emit(\'chosed\')"/>\
                </div>'
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
        sendCloseCommand: false,
        deleteItemNames: null,
        itemArray: null,
        editResult: {},
        infoHeader: [],
        message: '',
        currentInfoType: '',
        booksInfo: table_header.concat(book_addtion),
        magazineInfo: table_header.concat(magazine_addtion)
    },
    methods: {
        enter: function(){
            if (this.showDelete){
                //请求接口
                deleteItems()
            }else if (this.editModal) {
                //编辑模式
                this.sendCloseCommand = !this.sendCloseCommand
            }
            this.showModal = false
        },
        submitValue: function(data){
            this.editResult[data[0]] = data[1]
            if (data[0] == this.itemArray.length - 1){
                addItemInfo(updateInfo(this.editResult, this.currentInfoType))
            }
        },
        cancel: function(){
            this.showModal = false
        },
        edit: function(){
            this.editModal = true
            this.editResult = {}
        },
        importInfo: function(type){
            this.showSelect = false
            this.currentInfoType = type
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
            this.editResult = {}
            this.showItem = true
        },
        openFile: function(){
            $('#myFile').trigger('click')
        },
        showInfoModal: function(header, info, type){
            this.clearStatus()
            this.infoHeader = header
            this.itemArray = info
            this.currentInfoType = type
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
            this.showMessage = true
            this.showModal = true
        },
        showAddModal: function(header){
            this.clearStatus()
            this.infoHeader = header
            this.showSelect = true
            this.showModal = true
        },
        clearStatus: function(){
            this.showItem = false
            this.showDelete = false
            this.showMessage = false
            this.showSelect = false
            this.editModal = false
        },
        chosedFile: function(){
            this.showModal = false
            upload()
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
