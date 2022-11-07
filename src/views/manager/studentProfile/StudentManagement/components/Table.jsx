import '../assets/styles/index.scss'
import { Table, Tag, Button } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          // {
          //   title: '序号',
          //   width: 60,
          //   align: 'center',
          //   fixed: true,
          //   scopedSlots: { customRender: 'serialNumber' }
          // },
          {
            title: '学生姓名',
            width: 80,
            fixed: true,
            dataIndex: 'fullName'
          },
          {
            title: '性别',
            width: 60,
            align: 'center',
            dataIndex: 'genderStr'
          },
          {
            title: '身份证号',
            width: 180,
            dataIndex: 'idNumber'
          },
          {
            title: '学籍号',
            width: 180,
            dataIndex: 'studentNumber'
          },
          {
            title: '出生日期',
            width: 100,
            dataIndex: 'birthDateStr'
          },
          {
            title: '就读学校名称',
            width: 240,
            dataIndex: 'schoolName'
          },
          {
            title: '班级',
            width: 60,
            align: 'center',
            dataIndex: 'classNumber'
          },
          {
            title: '学籍所属学校',
            width: 240,
            dataIndex: 'originalSchoolName'
          },
          {
            title: '戴镜',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'isWearGlasses' }
          },
          {
            title: '眼镜类型',
            width: 100,
            dataIndex: 'glassesTypeStr'
          },
          {
            title: '左眼度数',
            width: 80,
            align: 'center',
            dataIndex: 'leftGlassesValue'
          },
          {
            title: '右眼度数',
            width: 80,
            align: 'center',
            dataIndex: 'rightGlassesValue'
          },
          {
            title: '创建时间',
            width: 160,
            dataIndex: 'createTimeStr'
          },
          {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'createQr' }
          }
        ]
      }
    }
  },
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...this.attributes}
        {...{
          scopedSlots: {
            // serialNumber: this.getConsecutiveSerialNumber,
            isWearGlasses: (text, record) => {
              return record.isWearGlasses === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
            },
            createQr: (text, record) => {
              return (
                <Button type='link'>生成二维码</Button>
              )
            }
          }
        }}
      />
    )
  }
}
