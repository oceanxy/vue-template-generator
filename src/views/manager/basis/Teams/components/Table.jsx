import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import ImagePreview from '@/components/ImagePreview'

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
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: 'LOGO',
            width: 60,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'logo' }
          },
          {
            title: '编号',
            fixed: true,
            width: 60,
            dataIndex: 'teamNo'
          },
          {
            title: '团队名称',
            width: 140,
            dataIndex: 'fullName'
          },
          {
            title: '所属中心',
            width: 200,
            dataIndex: 'parkName'
          },
          {
            title: '团队人数',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'teamMemberList' }
          },
          {
            title: '负责人',
            width: 100,
            dataIndex: 'leader'
          },
          {
            title: '负责人手机号',
            width: 120,
            dataIndex: 'leaderMobile'
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 80,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 200,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    onMembersManaClick(record) {
      this.$router.push({
        name: 'teamMembers',
        query: { teamId: record.id }
      })
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
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            logo: (text, record) => (
              <ImagePreview
                imageUrls={record.logoStr ? [record.logoStr] : []}
                width={32}
                height={32}
              />
            ),
            status: (text, record) => (
              <Switch
                checked={+record.status === 1}
                onChange={checked => this.onStatusChange({ checked, record })}
              />
            ),
            teamMemberList: record => record.teamMemberList?.length || 0,
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onMembersManaClick(record)}
                >
                  成员管理
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
