import { Form, Input, Modal } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { message } from '@/utils/message'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'

export default Form.create({})({
  mixins: [forFormModal()],
  props: {
    modalTitle: {
      type: String,
      default: '重置密码'
    },
    visibilityFieldName: {
      type: String,
      default: 'visibilityOfResetPwd'
    }
  },
  data() {
    return {
      modalProps: {
        width: 500,
        destroyOnClose: true
      }
    }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => {
            this.onSubmit({
              isFetchList: false,
              customAction: 'update',
              customApiName: this.moduleName === `${getFirstLetterOfEachWordOfAppName()}/common`
                ? 'updateCurrentAccountPwd'
                : this.currentItem._isMainAccount ? 'updateMainAccountPwd' : 'updateAccountPwd',
              customDataHandler(data) {
                data.comfirmPassword = data.password

                return data
              },
              async done(status) {
                if (this.moduleName === `${getFirstLetterOfEachWordOfAppName()}/common`) {
                  Modal.info({
                    title: '提示',
                    content: '修改密码成功，即将注销...',
                    onOk: async close => {
                      const response = await this.$store.dispatch('login/logout')

                      if (response.status) {
                        await this.$router.replace({
                          name: 'login',
                          // 提供给子项目的登录页面处理注销后的逻辑
                          params: { logout: '1' }
                        })
                      }

                      close()
                    }
                  })
                } else {
                  message(status, '修改密码成功')
                }
              }
            })
          }
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="新密码">
            {
              this.form.getFieldDecorator('password', {
                initialValue: '',
                validateTrigger: 'blur',
                validateFirst: true,
                rules: [
                  {
                    required: true,
                    message: '请输入新密码！'
                  },
                  {
                    validator(rule, value, callback) {
                      if (rule.required || value) {
                        if (value.length < 6 || value.length > 16) {
                          callback(new Error('请输入6~16位字符！'))
                        }
                      }

                      callback()
                    }
                  }
                ]
              })(<Input maxLength={16} placeholder="请输入新密码" allowClear />)
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
