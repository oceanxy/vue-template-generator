import '../assets/styles/index.scss'
import { Form, Cascader } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'


export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibilityFieldName: 'visibilityOfSetRooms',
      modalProps: {
        width: 500,
        wrapClassName: 'bnm-modal-edit-user-form'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    selectedRowKeys() {
      return this.getState('selectedRowKeys', this.moduleName)
    },
    search() {
      return this.$store.state[this.moduleName].search
    },
    allBuildList() {
      return this.getState('allBuildList', this.moduleName)?.list ?? []
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => this.onSubmit({
            isFetchList: false,
            customApiName: 'studentSetRooms',
            customDataHandler: this.customDataHandler,
            done: this.done
          })
        }
      }
    }
  },
  methods: {
    async done() {
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        customApiName: this.customApiName
      })
    },
    customDataHandler(values) {
      const data = { ...values }
      const ids = this.selectedRowKeys.join()

      data.ids = ids
      data.buildId = data.roomsData?.[0]
      data.floorId = data.roomsData?.[1]
      data.roomId = data.roomsData?.[2]
      delete data.roomsData

      return data
    }
  },
  watch: {
    visible: {
      async handler(value) {
        if (value) {
          const data = {
            orgId: this.search?.orgId,
            orgType: this.search?.orgType
          }

          await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            stateName: 'allBuildList',
            payload: data,
            customApiName: 'getAllBuildList'
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form colon={false}>
          <Form.Item label="选择宿舍">
            {
              this.form.getFieldDecorator('roomsData')(
                <Cascader
                  placeholder="请选择宿舍"
                  expandTrigger={'hover'}
                  allowClear
                  options={this.allBuildList}
                  fieldNames={{
                    label: 'name', value: 'id', children: 'children'
                  }}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal >
    )
  }
})
