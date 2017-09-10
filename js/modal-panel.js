Vue.component('my-modal', {
    template: '\
      <transition name="modal">\
        <div class="modal-mask">\
          <div class="modal-wrapper">\
            <div class="modal-container">\
              <div class="modal-header text-center">\
                <slot name="header"></slot>\
              </div>\
              <div class="modal-body">\
                <slot name="body"></slot>\
              </div>\
              <div class="modal-footer">\
                <slot name="footer"></slot>\
              </div>\
            </div>\
          </div>\
        </div>\
      </transition>'
})

Vue.component('info-item', {
    props: ['name', 'value'],
    template: '\
               <div>\
                 <span class="left-item">{{ name }}:</span>\
                 <span class="right-item">{{ value }}</span>\
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
        deleteItemNames: null,
        itemArray: null,
        infoHeader: '',
        message: '',
    },
    methods: {
        enter: function(){
            this.showModal = false
            //按下了确定
            if (showDelete){
                //请求接口
            }
        },
        cancel: function(){
            this.showModal = false
            //按下了取消
        },
        showInfoModal: function(header, info){
            this.clearStatus()
            this.infoHeader = header
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
        }
    },
    computed: {
        showCancel: function(){
            return this.showDelete
        }
    }
})
