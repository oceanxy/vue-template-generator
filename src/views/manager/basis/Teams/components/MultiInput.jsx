import '../assets/styles/index.scss'
import { Button, Input, Switch, Table } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      columns: [
        {
          title: '姓名',
          scopedSlots: { customRender: 'fullName' }
        },
        {
          title: '手机号码',
          scopedSlots: { customRender: 'mobile' }
        },
        {
          title: '身份证号',
          scopedSlots: { customRender: 'idCard' }
        },
        {
          title: '设为负责人',
          width: 120,
          align: 'center',
          scopedSlots: { customRender: 'isLeader' }
        },
        {
          title: '操作',
          width: 60,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataSource: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value.length) {
          this.dataSource = value.map(item => {
            item.id = Math.random()
            return item
          })
        } else {
          this.dataSource = []
          this.onCreateRow()
        }
      }
    }
  },
  methods: {
    onDelClick(id) {
      const index = this.dataSource.findIndex(item => item.id === id)
      this.dataSource.splice(index, 1)
    },
    onCreateRow() {
      const row = {
        allPath: '',
        remark: '',
        id: Math.random()
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.$emit('change', this.dataSource)
    }
  },
  render() {
    // const attr = {
    //   props: {
    //     ...omit(this.$props, 'value'),
    //     ...this.$attrs
    //   },
    //   on: this.$listeners
    // }

    return (
      <div class="tg-multi-input">
        <Button icon="plus" onClick={this.onCreateRow} />
        <Table
          class="multi-input-table"
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          rowKey="id"
          tableLayout={'fixed'}
          {...{
            scopedSlots: {
              fullName: (text, record) => (
                <Input
                  vModel={record.fullName}
                  placeholder="请输入团队成员姓名"
                  onBlur={this.onChange}
                />
              ),
              mobile: (text, record) => (
                <Input
                  vModel={record.mobile}
                  placeholder="请输入手机号码"
                  onBlur={this.onChange}
                />
              ),
              idCard: (text, record) => (
                <Input
                  vModel={record.idCard}
                  placeholder="请输入身份证号码"
                  onBlur={this.onChange}
                />
              ),
              isLeader: (text, record) => (
                <Switch
                  defaultChecked={record.idCard === 1}
                  onBlur={this.onChange}
                />
              ),
              operation: (text, record) => (
                <Button icon="delete" onClick={() => this.onDelClick(record.id)} />
              )
            }
          }}
        />
      </div>
    )
  }
}

/*
*
* <Row>
          <Col>
            <Button style={{ marginBottom: '20px' }} icon="plus" onClick={this.onPlusClick} />
          </Col>
        </Row>
        {
          this.driveForm.map((item, index) => (
            <Row gutter={10} {...{ props: { id: item.key } }}>
              {
                Object.entries(item).map(([key, value]) => key === 'key' ? null : (
                  <Col {...{ props: this.layouts[key] }}>
                    <Form.Item>
                      {
                        this.form.getFieldDecorator(`${key}_${index}`, {
                          rules: this.rules[key] || [],
                          initialValue: value || ''
                        })(
                          <Input placeholder={this.placeholders[key] || ''} />
                        )
                      }
                    </Form.Item>
                  </Col>
                ))
              }
              <Col span={2}>
                <Button icon="delete" onClick={() => this.onDelClick(index)} />
              </Col>
            </Row>
          ))
        } */
