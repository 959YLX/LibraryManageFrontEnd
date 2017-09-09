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

var info_modal = new Vue({
    el: '#info_modal',
    data: {
        showModal: false,
        InfoHeader: '',

    },
    methods: {
        closeModal: function(){
            this.showModal = false
        },
        showInfoModal: function(header, info){
            this.InfoHeader = header
            this.showModal = true
        }
    }
})
