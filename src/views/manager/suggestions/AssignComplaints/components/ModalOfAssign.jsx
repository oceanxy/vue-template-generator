import '../assets/styles/index.scss'
import { Form, Input, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import { cloneDeep, debounce } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 810 },
      visibleField: 'visibleOfAssign'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    personnelForSelect() {
      return this.getState('personnelForSelect', this.moduleName) || []
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.onSearchPersonnel()
        }
      }
    }
  },
  methods: {
    async onSearchPersonnel(keyword) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        customApiName: 'getSuggestionPersonnelForSelect',
        stateName: 'personnelForSelect',
        payload: { fullName: keyword }
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          customApiName: 'assignComplaints',
          customDataHandler: values => {
            const temp = cloneDeep(values)

            temp.organId = this.personnelForSelect.list.find(item => item.id === temp.assigneeId).organId

            if (!('ids' in temp)) {
              temp.ids = temp.id
            }

            return temp
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item
            label="受理人"
            class={'custom'}
            required
          >
            {
              this.form.getFieldDecorator('assigneeId')(
                <Select
                  placeholder="请选择受理人（输入受理人姓名或身份证号可搜索）"
                  notFoundContent={this.personnelForSelect.loading ? <Spin /> : undefined}
                  onSearch={debounce(this.onSearchPersonnel, 300)}
                  filterOption={false}
                  showSearch
                  allowClear
                  options={
                    this.personnelForSelect.list?.map(item => ({
                      value: item.id,
                      label: (
                        <div>
                          <span>{item.fullName}</span>
                          <span style={{ color: '#b3b3b3', marginLeft: '10px' }}>{item.organName}</span>
                        </div>
                      )
                    })) ?? []
                  }
                />
              )
            }
          </Form.Item>
          <Form.Item label={'说明'}>
            {
              this.form.getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '请输入说明！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder={'请输入说明'}
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
