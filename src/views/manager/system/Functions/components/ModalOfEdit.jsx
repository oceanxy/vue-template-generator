import '../assets/styles/index.scss'
import { Button, Col, Form, Input, Row, Table } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import CascaderMenu from '@/components/BNContainerWithSystemSider/components/CascaderMenu'
import { mapAction, mapState } from '@/utils/store'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 700,
        wrapclass: 'bnm-modal-edit-function-form'
      },
      tableProps: {
        columns: [
          {
            title: '功能地址',
            dataIndex: 'fnUrl',
            scopedSlots: { customRender: 'fnUrl' }
          },
          {
            title: '描述',
            dataIndex: 'fnInfoDescribe',
            scopedSlots: { customRender: 'fnInfoDescribe' }
          },
          {
            title: '操作',
            width: 80,
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null,
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false,
        bordered: true,
        rowKey: 'id'
      }
    }
  },
  computed: { ...mapState(['details']) },
  watch: {
    details() {
      this.tableProps.dataSource = this.details
    },
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.getDetail({
            id: this.currentItem.id,
            moduleName: this.moduleName
          })
        } else {
          this.tableProps.dataSource = []
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      const data = { ...values }

      if (data.menuId.length > 0) {
        data.menuId = data.menuId[data.menuId.length - 1]
      } else {
        data.menuId = ''
      }

      const functionInfoList = this.tableProps.dataSource.map((item, index) => {
        const fnUrl = data[`fnUrl${index}`]
        const fnInfoDescribe = data[`fnInfoDescribe${index}`]

        return {
          fnUrl,
          fnInfoDescribe
        }
      })

      return {
        function: {
          fnName: data.fnName,
          sortIndex: data.sortIndex,
          status: 1,
          menuId: data.menuId,
          id: this.currentItem?.id ?? ''
        },
        functionInfoList: functionInfoList
      }
    },
    onAddRow() {
      this.tableProps.dataSource.push({
        fnUrl: '',
        fnInfoDescribe: '',
        id: this.tableProps.dataSource.length
      })
    },
    onDeleteRow(index) {
      this.tableProps.dataSource.splice(index, 1)
    },

    ...mapAction(['getDetail'])
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
          class=""
          colon={false}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="所属菜单">
                {
                  this.form.getFieldDecorator('menuId', {
                    initialValue: this.currentItem.menuIds || [],
                    rules: [
                      {
                        required: true, type: 'array', message: '请输入菜单!', trigger: 'change'
                      }
                    ]
                  })(
                    <CascaderMenu />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="名称">
                {
                  this.form.getFieldDecorator('fnName', {
                    initialValue: this.currentItem.fnName,
                    rules: [
                      {
                        required: true, message: '请输入名称!', trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入名称"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="排序">
                {
                  this.form.getFieldDecorator('sortIndex', {
                    initialValue: `${this.currentItem.sortIndex || ''}` || undefined,
                    rules: [
                      {
                        required: true,
                        message: '请输入排序!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="越大排在越前"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={24}>
              <p
                class=""
                style={{ 'text-align': 'right' }}
              >
                <Button onclick={this.onAddRow}>+添加</Button>
              </p>
              <Table
                {...{ props: this.tableProps }}
                scopedSlots={{
                  fnUrl: (text, record, index) => (
                    <Form.Item
                      label=""
                      style={{ 'margin-bottom': '0' }}
                    >
                      {
                        this.form.getFieldDecorator(`fnUrl${index}`, { initialValue: record.fnUrl })(
                          <Input
                            placeholder="请输入"
                            allowClear
                          />
                        )
                      }
                    </Form.Item>
                  ),
                  fnInfoDescribe: (text, record, index) => (
                    <Form.Item
                      label=""
                      style={{ 'margin-bottom': '0' }}
                    >
                      {
                        this.form.getFieldDecorator(`fnInfoDescribe${index}`, { initialValue: record.fnInfoDescribe })(
                          <Input
                            placeholder="请输入"
                            allowClear
                          />
                        )
                      }
                    </Form.Item>
                  ),
                  operation: (text, record, index) => (
                    <Button
                      size="small"
                      type="danger"
                      icon="delete"
                      onclick={() => this.onDeleteRow(index)}
                    />
                  )
                }}
              />
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
