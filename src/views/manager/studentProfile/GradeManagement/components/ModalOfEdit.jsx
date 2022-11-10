import '../assets/styles/index.scss'
import { Col, Form, Input, Row, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapAction, mapState } from '@/utils/store'
import { mapGetters } from 'vuex'
// import { debounce, cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-edit-user-form'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    ...mapState(['currentItem'])
  },
  async created() {
    await Promise.all([
    ])
    console.log(this.currentItem)
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          // await this.onCompanySearch()
        }
      }
    }
  },
  methods: {
    ...mapAction(['getDetail']),
    // async onCompanySearch(keyword) {
    //   await this.$store.dispatch('getListForSelect', {
    //     moduleName: this.moduleName,
    //     stateName: 'companyList',
    //     customApiName: 'getWaitCompanyContractList',
    //   })
    // },
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          colon={false}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="学校名称">
                {
                  this.form.getFieldDecorator(
                    'schoolName',
                    {
                      initialValue: this.currentItem?.companyList?.map(item => item.id) || [],
                      rules: [
                        {
                          required: true,
                          message: '请输入学校名称!',
                          trigger: 'blur'
                        }
                      ]
                    }
                  )(
                    // <Select
                    //   showSearch
                    //   onSearch={debounce(this.onCompanySearch, 300)}
                    //   placeholder={'输入企业名称搜索'}
                    //   filterOption={false}
                    //   notFoundContent={this.companyListState.loading ? <Spin /> : undefined}
                    //   mode={'multiple'}
                    // >
                    //   {
                    //     this.companyList.map(item => (
                    //       <Select.Option
                    //         value={item.id}
                    //         title={item.companyName}
                    //       >
                    //         {item.companyName}
                    //       </Select.Option>
                    //     ))
                    //   }
                    // </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="学校名称">
                {
                  this.form.getFieldDecorator('fullName', {
                    initialValue: this.currentItem.fullName,
                    rules: [
                      {
                        required: true,
                        message: '请输入姓名!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="学校名称">
                {
                  this.form.getFieldDecorator('fullName', {
                    initialValue: this.currentItem.fullName,
                    rules: [
                      {
                        required: true,
                        message: '请输入姓名!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="学校名称">
                {
                  this.form.getFieldDecorator('fullName', {
                    initialValue: this.currentItem.fullName,
                    rules: [
                      {
                        required: true,
                        message: '请输入姓名!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="学校名称">
                {
                  this.form.getFieldDecorator('fullName', {
                    initialValue: this.currentItem.fullName,
                    rules: [
                      {
                        required: true,
                        message: '请输入姓名!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="备注">
                {
                  this.form.getFieldDecorator('remark', {
                    initialValue: this.currentItem.remark
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态">
                {
                  this.form.getFieldDecorator('status', {
                    initialValue: this.currentItem.status === 1,
                    valuePropName: 'checked'
                  })(
                    <Switch />
                  )
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
