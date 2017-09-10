Vue.component('my-modal', {
    template: '\
      <transition name="modal">\
        <div class="modal-mask">\
          <div class="modal-wrapper">\
            <div class="modal-container">\
              <div class="modal-header text-center">\
                <slot name="header">\
                </slot>\
              </div>\
              <div class="modal-body">\
                <slot name="body">\
                  default body\
                </slot>\
              </div>\
              <div class="modal-footer">\
                <slot name="footer">\
                  <button class="btn btn-success" @click="$emit(\'close\')">\
                    OK\
                  </button>\
                </slot>\
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

var info_modal = new Vue({
    el: '#info_modal',
    data: {
        showModal: false,
        infoHeader: '',
        itemArray: []
    },
    methods: {
        closeModal: function(){
            this.showModal = false
        },
        showInfoModal: function(header, info){
            this.infoHeader = header
            this.showModal = true
        }
    }
})
