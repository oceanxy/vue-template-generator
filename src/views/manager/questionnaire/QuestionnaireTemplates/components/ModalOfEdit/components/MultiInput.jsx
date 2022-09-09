import '../index.scss'
import { debounce } from 'lodash'
import ItemMultiInput from './ItemMultiInput'
import { Affix, Button, Input, Select, Space, Switch, Table } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    affixOffsetTop: {
      type: Number,
      required: true
    },
    affixTarget: {
      type: Function,
      required: true
    }
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
          title: '组件类型',
          width: 100,
          scopedSlots: { customRender: 'modType' }
        },
        {
          title: '选项',
          scopedSlots: { customRender: 'itemOptionList' }
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
            <Affix
              offsetTop={this.affixOffsetTop}
              target={this.affixTarget}
            >
              <Button
                icon={'plus'}
                type="primary"
                ghost
                onClick={this.onCreateRow}
              >
                添加问卷题目
              </Button>
            </Affix>
          ),
          width: 180,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataSource: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentItemId() {
      return this.getState('currentItem', this.moduleName).id
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value.length) {
          this.dataSource = value.map(item => {
            item.id = item.id || Math.random()

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
  created() {
    this.loading = !!this.currentItemId
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
          loading={this.loading}
          {...{
            scopedSlots: {
              fullName: (text, record) => (
                <Input.TextArea
                  vModel={record.fullName}
                  placeholder="问卷标题"
                  autoSize={{ minRows: 6 }}
                  onBlur={() => this.onChange()}
                />
              ),
              modType: record => (
                <Select
                  vModel={record.modType}
                  placeholder={'组件类型'}
                  onChange={debounce(this.onChange, 300)}
                >
                  <Select.Option value={1}>单选</Select.Option>
                  <Select.Option value={2}>多选</Select.Option>
                  <Select.Option value={4}>简答</Select.Option>
                </Select>
              ),
              itemOptionList: record => (
                <ItemMultiInput
                  disabled={record.modType !== 1 && record.modType !== 2}
                  vModel={record.itemOptionList}
                  onChange={this.onChange}
                />
              ),
              description: record => (
                <Input.TextArea
                  vModel={record.description}
                  placeholder={'描述内容'}
                  autoSize={{ minRows: 6 }}
                  onBlur={this.onChange}
                />
              ),
              isRequired: record => (
                <Switch vModel={record.isRequired} onChange={this.onChange} />
              ),
              status: record => (
                <Switch vModel={record.status} onChange={this.onChange} />
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
