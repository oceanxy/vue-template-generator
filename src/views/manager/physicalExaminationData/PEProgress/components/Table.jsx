import '../assets/styles/index.scss'
import forTable from '@/mixins/forTable'
import { Button, Progress, Switch, Tag } from 'ant-design-vue'

export default {
  mixins: [forTable({ isFetchList: false })],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 70,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '姓名',
            width: 80,
            align: 'center',
            fixed: true,
            dataIndex: 'fullName'
          },
          {
            title: '身份证号',
            width: 170,
            dataIndex: 'idNumber'
          },
          {
            title: '学校名称',
            width: 220,
            dataIndex: 'peObjOrgName'
          },
          {
            title: '年级',
            width: 100,
            align: 'center',
            dataIndex: 'gradeStr'
          },
          {
            title: '班级',
            width: 70,
            align: 'center',
            dataIndex: 'classNumber'
          },
          {
            title: '已检项目',
            width: 260,
            scopedSlots: { customRender: 'peItemVOList' }
          },
          {
            title: '已检项数',
            width: 80,
            align: 'center',
            dataIndex: 'alreadyExamineItemsNum',
            scopedSlots: { customRender: 'alreadyExamineItemsNum' }
          },
          {
            title: '体检进度',
            width: 100,
            align: 'center',
            dataIndex: 'alreadyExamineItemPercentage',
            scopedSlots: { customRender: 'alreadyExamineItemPercentage' }
          },
          {
            title: '是否签退',
            align: 'center',
            width: 80,
            dataIndex: 'isSignOut',
            scopedSlots: { customRender: 'isSignOut' }
          },
          {
            title: '签退时间',
            align: 'center',
            width: 150,
            dataIndex: 'signTimeStr'
          },
          {}
        ],
        rowSelection: null
      },
      scopedSlots: {
        peItemVOList: (text, record) => (
          <div class={'tg-tags-group'}>
            {
              record.peItemVOList?.map(item => (
                <Button
                  onClick={() => this._setVisibilityOfModal({ ...record, peItem: item }, 'visibilityOfDetails')}
                  type="primary"
                  style={{
                    backgroundColor: 'rgba(22, 179, 100, 0.6)',
                    borderColor: 'rgba(22, 179, 100, 0.5)'
                  }}
                >
                  {item.itemName}
                </Button>
              ))
            }
          </div>
        ),
        alreadyExamineItemsNum: text => {
          return (
            <Tag>{text}</Tag>
          )
        },
        alreadyExamineItemPercentage: text => (
          <Progress size={'small'} strokeColor={'rgba(22, 179, 100, 0.6)'} percent={text * 100} />
        ),
        isSignOut: (text, record) => (
          <Switch
            checked={text === 1}
            onChange={checked => this.onStatusChange(
              {
                checked,
                record,
                actualFieldName: 'isSignOut'
              }
            )}
          />
        )
      }
    }
  }
}
