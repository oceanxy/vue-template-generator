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
            dataIndex: 'genderStr'
          },
          {
            title: '年龄',
            align: 'center',
            width: 70,
            dataIndex: 'age'
          },
          {
            title: '心状态',
            align: 'center',
            width: 100,
            dataIndex: 'heartStatus',
            scopedSlots: { customRender: 'heartStatus' }
          },
          {
            title: '心异常项',
            align: 'center',
            width: 100,
            dataIndex: 'heartException'
          },
          {
            title: '肺状态',
            align: 'center',
            width: 100,
            dataIndex: 'lungStatus',
            scopedSlots: { customRender: 'lungStatus' }
          },
          {
            title: '肺异常项',
            align: 'center',
            width: 100,
            dataIndex: 'lungException'
          },
          {
            title: '肝状态',
            align: 'center',
            width: 100,
            dataIndex: 'liverStatus',
            scopedSlots: { customRender: 'liverStatus' }
          },
          {
            title: '肝异常项',
            align: 'center',
            width: 100,
            dataIndex: 'liverException'
          },
          {
            title: '脾状态',
            align: 'center',
            width: 100,
            dataIndex: 'spleenStatus',
            scopedSlots: { customRender: 'spleenStatus' }
          },
          {
            title: '脾异常项',
            align: 'center',
            width: 100,
            dataIndex: 'spleenException'
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
        heartStatus: text => this.getTag(text, ['无', '有']),
        lungStatus: text => this.getTag(text, ['无', '有']),
        liverStatus: text => this.getTag(text, ['无', '有']),
        spleenStatus: text => this.getTag(text, ['无', '有'])
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
