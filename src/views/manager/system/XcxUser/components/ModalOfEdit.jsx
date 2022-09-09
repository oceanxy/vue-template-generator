import '../assets/styles/index.scss'
import { Col, Form, Input, Row, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { mapAction, mapState } from '@/utils/store'
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data () {
    return {
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-edit-user-form'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    ...mapState(['currentItem']),
    administrativeDivision() {
      return this.getState('administrativeDivision', 'common') || []
    },
    companyListState: {
      get () {
        return this.getState('companyList', this.moduleName)
      },
      set (list) {
        this.$store.commit('setDetails', {
          value: list,
          moduleName: this.moduleName,
          stateName: 'companyList'
        })
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler (value) {
        if (value) {
          await this.onCompanySearch()
        }
      }
    }
  },
  methods: {
    ...mapAction(['getDetail']),
    customDataHandler (values) {
      values.avatarUrl = values.avatarUrl?.[0].key ?? ''
      values.companyList = values.companyList.map(item => ({ id: item }))

      return values
    },
    onChangeRole (value, e) {
      // console.log(value, e)
    },
    async onCompanySearch (keyword) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'companyList',
        customApiName: 'getWaitCompanyContractList',
        payload: {
          companyName: keyword,
          pageIndex: 0,
          pageSize: 20
        }
      })
    },
    removeDuplicateObj (arr) {
      const res = new Map()

      return arr.filter(item => !res.has(item.id) && res.set(item.id, 1))
    }
  },
  render () {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }


    // 回显图片
    let fileList = []

    if (this.currentItem.avatarUrlStr && this.currentItem.avatarUrl) {
      fileList = [{
        uid: this.currentItem.nickName,
        url: this.currentItem.avatarUrlStr,
        key: this.currentItem.avatarUrl,
        status: 'done',
        name: this.currentItem.avatarUrlStr?.substring(this.currentItem.avatarUrlStr.lastIndexOf('/') ?? '')
      }]
    }

    const companyList = this.removeDuplicateObj(
      [].concat(this.currentItem?.companyList ?? [], this.companyListState.list)
    )

    return (
      <DragModal {...attributes}>
        <Form class="" colon={false}>
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="头像">
                {
                  this.form.getFieldDecorator('avatarUrl', { initialValue: fileList })(
                    <BNUploadPictures limit={1} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="昵称">
                {this.form.getFieldDecorator('nickName', {
                  initialValue: this.currentItem.nickName,
                  rules: [
                    {
                      required: true,
                      message: '请输入姓名!',
                      trigger: 'blur'
                    }
                  ]
                })(<Input placeholder="请输入" allowClear />)}
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item label="真实姓名">
                {this.form.getFieldDecorator('idCard', { initialValue: this.details.idCard })(<Input placeholder="请输入" allowClear />)}
              </Form.Item>
            </Col> */}
            {/* <Col span={12}>
              <Form.Item label="手机号码">
                {this.form.getFieldDecorator('mobile', {
                  initialValue: this.details.mobile ?? undefined,
                  rules: [
                    {
                      required: true,
                      message: '请输入手机号码!',
                      trigger: 'blur'
                    }
                  ]
                })(<Input placeholder="请输入" allowClear />)}
              </Form.Item>
            </Col> */}
            <Col span={24}>
              <Form.Item label="绑定企业">
                {this.form.getFieldDecorator('companyList', { initialValue: this.currentItem?.companyList?.map(item => item.id) || [] })(
                  <Select
                    showSearch
                    onSearch={debounce(this.onCompanySearch, 300)}
                    placeholder={'输入企业名称搜索'}
                    filterOption={false}
                    notFoundContent={this.companyListState.loading ? <Spin /> : undefined}
                    mode={'multiple'}
                  >
                    {companyList.map(item => (
                      <Select.Option value={item.id} title={item.companyName}>
                        {item.companyName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态">
                {this.form.getFieldDecorator('status', {
                  initialValue: this.currentItem.status === 1,
                  valuePropName: 'checked'
                })(<Switch />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
