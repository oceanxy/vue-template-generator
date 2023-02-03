import { Checkbox, Form, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal({ disableSubmitButton: false })],
  data() {
    return {
      visibilityFieldName: 'visibilityOfOneClickReport',
      modalProps: {
        width: 610,
        destroyOnClose: true
      }
    }
  },
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    },
    pendingStudents() {
      return this.$store.state[this.moduleName].pendingStudents
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel('visibilityOfOneClickReport'),
          ok: () => this.onSubmit({
            customDataHandler: value => {
              const data = cloneDeep(value)

              debugger

              data.type = this.search.type

              return data
            }
          })
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            stateName: 'pendingStudents',
            customApiName: 'getPendingStudents'
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Spin spinning={this.pendingStudents.loading}>
          <Form class="tg-form-grid" colon={false}>
            {
              this.pendingStudents.list.length
                ? (
                  <Form.Item label="待处理学生">
                    {
                      this.form.getFieldDecorator('studentIds', { initialValue: this.currentItem.fullName })(
                        <div>
                          {
                            this.pendingStudents.list.map(item => (
                              <p>{item.classNumber}</p>
                            ))
                          }
                        </div>
                      )
                    }
                  </Form.Item>
                )
                : (
                  <p style={'font-size: 14px; font-weight: bolder; padding-bottom: 20px;'}>
                    未发现待处理的异常学生，可进行一键上报，上报后亦可添加异常。
                  </p>
                )
            }
            <Form.Item label="">
              {
                this.form.getFieldDecorator('isStop', {
                  initialValue: false,
                  getValueFromEvent: e => +e.target.checked
                })(
                  <Checkbox>班级停课</Checkbox>
                )
              }
            </Form.Item>
          </Form>
        </Spin>
      </DragModal>
    )
  }
})
