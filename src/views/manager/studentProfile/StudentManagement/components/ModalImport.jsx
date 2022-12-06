import '../assets/styles/index.scss'
import { Form, Button } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import apis from '@/apis'


export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfImport',
      modalProps: {
        width: 380,
        footer: false,
        title: '全局',
        wrapClassName: 'bnm-modal-edit-user-form'
      },
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibleField)
        }
      }
    }
  },
  methods: {
  },
  watch: {
    'modalProps.visible'(value) {

    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <div id="print">
          <img class='imgCode' src={this.imgCodeUrl}></img>
        </div>
      </DragModal >
    )
  }
})
