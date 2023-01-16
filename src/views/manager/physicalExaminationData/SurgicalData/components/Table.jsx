import '../assets/styles/index.scss'
import forTable from '@/mixins/forTable'
import { Tag } from 'ant-design-vue'

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
            title: '活动名称',
            width: 200,
            dataIndex: 'activityName'
          },
          {
            title: '组织机构',
            width: 200,
            dataIndex: 'activityOrgName'
          },
          {
            title: '学校名称',
            width: 200,
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
            title: '性别',
            width: 70,
            align: 'center',
            scopedSlots: { customRender: 'gender' }
          },
          {
            title: '年龄',
            align: 'center',
            width: 70,
            dataIndex: 'age'
          },
          {
            title: '头部状态',
            align: 'center',
            width: 100,
            dataIndex: 'headStatus',
            scopedSlots: { customRender: 'headStatus' }
          },
          {
            title: '头部异常项',
            align: 'center',
            width: 100,
            dataIndex: 'headException'
          },
          {
            title: '颈部状态',
            align: 'center',
            width: 100,
            dataIndex: 'neckStatus',
            scopedSlots: { customRender: 'neckStatus' }
          },
          {
            title: '颈部异常项',
            align: 'center',
            width: 100,
            dataIndex: 'neckException'
          },
          {
            title: '胸部状态',
            align: 'center',
            width: 100,
            dataIndex: 'chestStatus',
            scopedSlots: { customRender: 'chestStatus' }
          },
          {
            title: '胸部异常项',
            align: 'center',
            width: 100,
            dataIndex: 'chestException'
          },
          {
            title: '脊柱状态',
            align: 'center',
            width: 100,
            dataIndex: 'spineStatus',
            scopedSlots: { customRender: 'spineStatus' }
          },
          {
            title: '脊柱异常项',
            align: 'center',
            width: 100,
            dataIndex: 'spineException'
          },
          {
            title: '四肢状态',
            align: 'center',
            width: 100,
            dataIndex: 'limbStatus',
            scopedSlots: { customRender: 'limbStatus' }
          },
          {
            title: '四肢异常项',
            align: 'center',
            width: 100,
            dataIndex: 'limbException'
          },
          {
            title: '皮肤状态',
            align: 'center',
            width: 100,
            dataIndex: 'skinStatus',
            scopedSlots: { customRender: 'skinStatus' }
          },
          {
            title: '皮肤异常项',
            align: 'center',
            width: 100,
            dataIndex: 'skinException'
          },
          {
            title: '淋巴结状态',
            align: 'center',
            width: 110,
            dataIndex: 'lymphGlandStatus',
            scopedSlots: { customRender: 'lymphGlandStatus' }
          },
          {
            title: '淋巴结异常项',
            align: 'center',
            width: 110,
            dataIndex: 'lymphGlandException'
          },
          {
            title: '建议',
            align: 'center',
            width: 200,
            dataIndex: 'proposal'
          },
          {
            title: '结论',
            align: 'center',
            width: 100,
            dataIndex: 'conclusion'
          },
          {
            title: '设备名称',
            align: 'center',
            width: 100,
            dataIndex: 'devName'
          },
          {
            title: '体检时间',
            width: 140,
            align: 'center',
            dataIndex: 'createTimeStr'
          }
        ],
        rowSelection: null
      },
      scopedSlots: {
        gender: (text, record) => {
          return <Tag color={['', '#84adff', '#fea3b4'][+record.gender]}>{record.genderStr}</Tag>
        },
        headStatus: text => this.getTag(text),
        neckStatus: text => this.getTag(text),
        chestStatus: text => this.getTag(text),
        spineStatus: text => this.getTag(text),
        limbStatus: text => this.getTag(text),
        skinStatus: text => this.getTag(text),
        lymphGlandStatus: text => this.getTag(text)
      }
    }
  },
  methods: {
    getTag(value, labelArr = ['正常', '异常']) {
      return (
        <Tag color={['rgba(22, 179, 100, 0.6)', 'rgba(179, 22, 22, 0.6)'][value]}>
          {labelArr[value]}
        </Tag>
      )
    }
  }
}
