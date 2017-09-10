var fixSize = function(){
    var body_height = $('body').height()
    var container_height = (body_height * 90) / 100 - 20
    var height = (container_height * 1) / 10 - 10
    var modal_body_height = (container_height * 8) / 10 - 10
    console.log(container_height + '---' + height + '---' + modal_body_height)
    $('#modal_container').css('max-height', container_height)
    $('#modal_header').css('max-height', height)
    $('#modal_footer').css('max-height', height)
    $('#modal_body').css('max-height', modal_body_height)
}

$(window).resize(function () {
    fixSize()
});

$(document).ready(function(){
    fixSize()
})

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

var info_modal = new Vue({
    el: '#info_modal',
    data: {
        showModal: false,
        showItem: false,
        showDelete: false,
        showMessage: false,
        trashModel: false,
        editModal: false,
        deleteItemNames: null,
        itemArray: null,
        infoHeader: '',
        message: '',
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
        clearStatus: function(){
            this.showItem = false
            this.showDelete = false
            this.editModal = false
        }
    },
    computed: {
        showCancel: function(){
            return this.showDelete
        },
        showEdit: function(){
            return this.showItem
        }
    }
})
