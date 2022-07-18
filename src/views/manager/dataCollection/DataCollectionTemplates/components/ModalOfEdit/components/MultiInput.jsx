import '../index.scss'
import { debounce } from 'lodash'
import ItemMultiInput from './ItemMultiInput'
import { Button, Input, Modal, Select, Space, Spin, Switch, Table } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    indicators: {
      type: Object,
      default: () => ({})
    },
    templateType: {
      type: Number,
      default: 1
    }
  },
  data() {
    const columns = [
      {
        title: '序号',
        width: 60,
        align: 'center',
        dataIndex: 'serialNum'
      },
      {
        title: '标题',
        width: 140,
        scopedSlots: { customRender: 'fullName' }
      },
      {
        title: '描述',
        width: 140,
        scopedSlots: { customRender: 'description' }
      },
      {
        title: '选项',
        scopedSlots: { customRender: 'itemOptionList' }
      },
      {
        title: '组件类型',
        width: 100,
        scopedSlots: { customRender: 'modType' }
      },
      {
        title: '是否必填',
        align: 'center',
        width: 100,
        scopedSlots: { customRender: 'isRequired' }
      },
      {
        title: '启用状态',
        align: 'center',
        width: 100,
        scopedSlots: { customRender: 'status' }
      },
      {
        title: (
          <Button
            icon={'plus'}
            type="primary"
            ghost
            onClick={this.onCreateRow}
          >
            添加填报项
          </Button>
        ),
        width: 180,
        align: 'center',
        scopedSlots: { customRender: 'operation' }
      }
    ]

    if (this.templateType === 1) {
      columns.splice(1, 0, {
        title: '指标',
        width: 140,
        scopedSlots: { customRender: 'targetId' }
      })
    }

    return {
      columns,
      dataSource: [],
      loading: false
    }
  },
  created() {
    this.loading = true
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value.length) {
          this.dataSource = value.map(item => {
            item.id = item.id || Math.random()
            item.disabled = !!item.targetId
            item.targetId = item.targetId || ''
            return item
          })
        } else {
          this.dataSource = []
          this.onCreateRow()
        }

        this.loading = false
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
        id: Math.random(),
        disabled: false,
        serialNum: this.dataSource.length + 1,
        targetId: '',
        fullName: '',
        itemOptionList: [],
        description: '',
        modType: 1,
        isRequired: true,
        status: true
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.loading = true
      this.$emit('change', this.dataSource)
      this.loading = false
    },
    onMoveUp(id) {
      this.loading = true
      const index = this.dataSource.findIndex(item => item.id === id)
      const target = this.dataSource.filter((item, i) => {
        if (index === i) {
          item.serialNum = +item.serialNum - 1
        }

        if (index - 1 === i) {
          item.serialNum = +item.serialNum + 1
        }

        return index === i || index - 1 === i
      })

      this.dataSource.splice(index - 1, 2, ...([target[0], target[1]] = [target[1], target[0]]))
      this.loading = false
    },
    onMoveDown(id) {
      this.loading = true
      const index = this.dataSource.findIndex(item => item.id === id)
      const target = this.dataSource.filter((item, i) => {
        if (index === i) {
          item.serialNum = +item.serialNum + 1
        }

        if (index + 1 === i) {
          item.serialNum = +item.serialNum - 1
        }

        return index === i || index + 1 === i
      })

      this.dataSource.splice(index, 2, ...([target[0], target[1]] = [target[1], target[0]]))
      this.loading = false
    },
    resetRow(value, record) {
      const temp = this.indicators.list.find(item => item.id === value)

      record.targetId = temp.id
      record.fullName = temp.fullName
      record.itemOptionList = temp.targetOptionList
      record.description = temp.description
      record.modType = 1
      record.isRequired = true
      record.status = true
      record.disabled = true
    },
    async onIndicatorChange(value, record) {
      if (value !== '') {
        if (record.fullName || record.itemOptionList?.length || record.description) {
          Modal.confirm({
            title: '请确认',
            content: '当前行存在已输入的数据，若要使用指标数据来覆盖，请单击“覆盖”按钮，否则请单击“取消”按钮。',
            okText: '覆盖',
            cancelText: '取消',
            onOk: async close => {
              this.resetRow(value, record)

              close()
            },
            onCancel: () => {
              record.targetId = ''
            }
          })
        } else {
          this.resetRow(value, record)
        }
      } else {
        record.disabled = false
      }
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
          rowKey="id"
          loading={{
            spinning: this.loading,
            delay: 100
          }}
          {...{
            scopedSlots: {
              targetId: (text, record) => (
                <Select
                  vModel={record.targetId}
                  title={'输入指标名称搜索'}
                  placeholder={'输入指标名称搜索'}
                  showSearch
                  filterOption={false}
                  onSearch={debounce(this.$listeners.search, 300)}
                  notFoundContent={this.indicators.loading ? <Spin /> : undefined}
                  onChange={value => this.onIndicatorChange(value, record)}
                  dropdownStyle={{ minWidth: '240px' }}
                  disabled={this.templateType !== 1}
                >
                  <Select.OptGroup>
                    <span slot={'label'}>自定义输入</span>
                    <Select.Option value={''}>自定义输入</Select.Option>
                  </Select.OptGroup>
                  <Select.OptGroup>
                    <span slot={'label'}>从指标导入（输入关键字可搜索指标）</span>
                    {
                      this.indicators.list.map(item => (
                        <Select.Option
                          value={item.id}
                          title={item.fullName}
                        >
                          {item.fullName}
                        </Select.Option>
                      ))
                    }
                  </Select.OptGroup>
                </Select>
              ),
              fullName: (text, record) => (
                <Input.TextArea
                  vModel={record.fullName}
                  placeholder="问卷标题"
                  autoSize={{ minRows: 4 }}
                  onBlur={() => this.onChange()}
                  disabled={record.disabled}
                />
              ),
              modType: record => (
                <Select
                  vModel={record.modType}
                  placeholder={'组件类型'}
                  onChange={debounce(this.onChange, 300)}
                  disabled={record.disabled}
                >
                  <Select.Option value={1}>单选</Select.Option>
                  <Select.Option value={2}>多选</Select.Option>
                  <Select.Option value={3}>简答</Select.Option>
                </Select>
              ),
              itemOptionList: record => (
                <ItemMultiInput
                  vModel={record.itemOptionList}
                  onChange={this.onChange}
                  disabled={record.disabled}
                />
              ),
              description: record => (
                <Input.TextArea
                  vModel={record.description}
                  placeholder={'描述内容'}
                  autoSize={{ minRows: 4 }}
                  onBlur={this.onChange}
                  disabled={record.disabled}
                />
              ),
              isRequired: record => (
                <Switch vModel={record.isRequired} onChange={this.onChange} disabled={record.disabled} />
              ),
              status: record => (
                <Switch vModel={record.status} onChange={this.onChange} disabled={record.disabled} />
              ),
              operation: (text, record, index) => (
                <Space>
                  <Button
                    icon="minus"
                    onClick={() => this.onDelClick(record.id)}
                  />
                  <Button
                    icon="up"
                    title={'上移'}
                    disabled={index <= 0}
                    onClick={() => this.onMoveUp(record.id)}
                  />
                  <Button
                    icon="down"
                    title={'下移'}
                    disabled={index >= this.dataSource.length - 1}
                    onClick={() => this.onMoveDown(record.id)}
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
