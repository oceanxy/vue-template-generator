import { Button, Input, Select, Space, Table } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      columns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          dataIndex: 'serialNum'
        },
        {
          title: '名称',
          scopedSlots: { customRender: 'fullName' }
        },
        {
          title: '文件类型',
          width: 120,
          scopedSlots: { customRender: 'fileType' }
        },
        {
          title: '是否必需',
          width: 80,
          scopedSlots: { customRender: 'isMust' }
        },
        {
          title: (
            <Button
              icon={'plus'}
              ghost
              size={'small'}
              type={'primary'}
              class={'plus-btn'}
              onClick={this.onCreateRow}
            />
          ),
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
        }
      }
    }
  },
  methods: {
    onDelClick(id) {
      const index = this.dataSource.findIndex(item => item.id === id)

      this.dataSource.splice(index, 1)
      this.$emit('change', this.dataSource)
    },
    onCreateRow() {
      const row = {
        id: Math.random(),
        serialNum: this.dataSource.length + 1,
        fullName: '',
        isMust: 1,
        fileType: 1
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.$emit('change', this.dataSource)
    }
  },
  render() {
    return (
      <div class="tg-multi-input">
        <Table
          class="multi-input-table"
          tableLayout={'fixed'}
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          size={'middle'}
          locale={{ emptyText: '如果需要用户上传佐证材料，请添加' }}
          rowKey="id"
          {...{
            scopedSlots: {
              fullName: (text, record) => (
                <Input
                  vModel={record.fullName}
                  placeholder="名称"
                  onBlur={() => this.onChange()}
                />
              ),
              fileType: (text, record) => (
                <Select
                  vModel={record.fileType}
                  placeholder="文件类型"
                  onChange={() => this.onChange()}
                >
                  <Select.Option value={1}>pdf</Select.Option>
                  <Select.Option value={2}>jpg/png</Select.Option>
                  <Select.Option value={3}>其他</Select.Option>
                </Select>
              ),
              isMust: (text, record) => (
                <Select
                  vModel={record.isMust}
                  placeholder="是否必须"
                  onChange={() => this.onChange()}
                >
                  <Select.Option value={1}>是</Select.Option>
                  <Select.Option value={0}>否</Select.Option>
                </Select>
              ),
              operation: (text, record) => (
                <Space>
                  <Button
                    icon="minus"
                    onClick={() => this.onDelClick(record.id)}
                  />
                </Space>
              )
            }
          }}
        />
      </div>
    )
  }
}
