import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '房号',
            align: 'center',
            dataIndex: 'roomNo'
          },
          {
            title: '图片',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'imgList' }
          },
          {
            title: '位置',
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '面积（㎡）',
            align: 'center',
            dataIndex: 'roomArea'
          },
          {
            title: '单价',
            align: 'center',
            scopedSlots: { customRender: 'price' }
          },
          {
            title: '工位数',
            align: 'center',
            dataIndex: 'workstationNum'
          },
          {
            title: '配套设施',
            dataIndex: 'supportFacilityStr'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 200,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    async onAgencyHistoryClick(record) {
      await this._setVisibleOfModal(record, 'visibleOfContractHistory')
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            imgList: (text, record) => (
              <img src={record.imgList[0]?.path} alt={''} class={'bnm-table-img'} />
            ),
            address: (text, record) => `${record.buildName}/${record.floorName}`,
            price: (text, record) => `￥${record.price}/${['月', '季', '年'][record.priceType - 1]}`,
            status: (text, record) => (
              <Switch
                checked={+record.status === 1}
                onChange={checked => this.onStatusChange(checked, record)}
              />
            ),
            operation: (text, record) => (
              <Space class="operation-space">
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onAgencyHistoryClick(record)}
                >
                  签约查询
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onEditClick(record)}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onDeleteClick(record)}
                >
                  删除
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
