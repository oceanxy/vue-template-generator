import forTable from '@/mixins/forTable'
import { Switch, Tag } from 'ant-design-vue'

export default {
  mixins: [forTable()],
  props: {
    dataSource: {
      type: Object,
      required: true
    },
    tableName: {
      type: String,
      required: true
    }
  },
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
          }
        ],
        rowSelection: null
      },
      scopedSlots: {
        serialNumber: (text, record, index) => index + 1,
        isEffective: (text, record) => (
          <Switch
            checked={text === 1}
            onChange={checked => this.onStatusChange(
              {
                checked,
                record: { ...record, peItem: this.dataSource },
                nameKey: 'peItem.itemName',
                actualFieldName: 'isEffective',
                customApiName: this.dynamicProperties.apiToUpdateList,
                stateName: this.dataSource.itemId,
                optimisticUpdate: false
              }
            )}
          />
        ),
        medicalHistoryStatus: text => this.getTag(text, ['无', '有']),
        cariesUpperLeft: text => this.getTag(text),
        cariesUpperRight: text => this.getTag(text),
        cariesLowerLeft: text => this.getTag(text),
        cariesLowerRight: text => this.getTag(text),
        periodontalStatus: text => this.getTag(text),
        trachomaStatus: text => this.getTag(text),
        conjunctivitisStatus: text => this.getTag(text),
        heartStatus: text => this.getTag(text),
        lungStatus: text => this.getTag(text),
        liverStatus: text => this.getTag(text),
        spleenStatus: text => this.getTag(text),
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
  computed: {
    itemList() {
      return this.getState(this.dataSource.itemId, this.moduleName, this.submoduleName)
    },
    currentItemOfParent() {
      return this.getState('currentItem', this.moduleName)
    },
    dynamicProperties() {
      if (this.dataSource.itemId === '1001') {
        return {
          columns: [
            {
              title: '体检时间',
              dataIndex: 'createTimeStr'
            },
            {
              title: '身高（cm）',
              align: 'center',
              dataIndex: 'heightStr'
            },
            {
              title: '体重（kg）',
              align: 'center',
              dataIndex: 'weightStr'
            },
            {
              title: '是否有效',
              width: 100,
              align: 'center',
              dataIndex: 'isEffective',
              scopedSlots: { customRender: 'isEffective' }
            }
          ],
          apiToGetList: 'getHeightAndWeightDataByStudentId',
          apiToUpdateList: 'updateHeightAndWeightDataStatus'
        }
      }

      if (this.dataSource.itemId === '1003') {
        return {
          columns: [
            {
              title: '体检时间',
              width: 140,
              align: 'center',
              dataIndex: 'createTimeStr'
            },
            {
              title: '用力肺活量',
              width: 120,
              align: 'center',
              dataIndex: 'fvc'
            },
            {
              title: '用力峰值流量',
              width: 120,
              align: 'center',
              dataIndex: 'fvPef'
            },
            {
              title: '最大通气量',
              width: 120,
              align: 'center',
              dataIndex: 'mvv'
            },
            {
              title: '肺活量(ml)',
              width: 120,
              align: 'center',
              dataIndex: 'vc'
            },
            {
              title: '是否有效',
              width: 100,
              fixed: 'right',
              align: 'center',
              dataIndex: 'isEffective',
              scopedSlots: { customRender: 'isEffective' }
            }
          ],
          apiToGetList: 'getLungFunctionDataByStudentId',
          apiToUpdateList: 'updateLungFunctionDataStatus'
        }
      }

      if (this.dataSource.itemId === '1004') {
        return {
          columns: [
            {
              title: '体检时间',
              width: 140,
              align: 'center',
              dataIndex: 'createTimeStr'
            },
            {
              title: '左眼视力',
              align: 'center',
              dataIndex: 'leftVisionStr'
            },
            {
              title: '右眼视力',
              align: 'center',
              dataIndex: 'rightVisionStr'
            },
            {
              title: '是否有效',
              width: 100,
              fixed: 'right',
              align: 'center',
              dataIndex: 'isEffective',
              scopedSlots: { customRender: 'isEffective' }
            }
          ],
          apiToGetList: 'getVisualDataByStudentId',
          apiToUpdateList: 'updateVisualDataStatus'
        }
      }

      if (this.dataSource.itemId === '1005') {
        return {
          columns: [
            {
              title: '体检时间',
              width: 140,
              align: 'center',
              dataIndex: 'createTimeStr'
            },
            {
              title: '病史',
              width: 80,
              align: 'center',
              dataIndex: 'medicalHistoryStatus',
              scopedSlots: { customRender: 'medicalHistoryStatus' }
            },
            {
              title: '龋齿左上部',
              width: 120,
              align: 'center',
              dataIndex: 'cariesUpperLeft',
              scopedSlots: { customRender: 'cariesUpperLeft' }
            },
            {
              title: '龋齿右上部',
              width: 120,
              align: 'center',
              dataIndex: 'cariesUpperRight',
              scopedSlots: { customRender: 'cariesUpperRight' }
            },
            {
              title: '龋齿左下部',
              width: 120,
              align: 'center',
              dataIndex: 'cariesLowerLeft',
              scopedSlots: { customRender: 'cariesLowerLeft' }
            },
            {
              title: '龋齿右下部',
              width: 120,
              align: 'center',
              dataIndex: 'cariesLowerRight',
              scopedSlots: { customRender: 'cariesLowerRight' }
            },
            {
              title: '牙周疾病',
              width: 100,
              align: 'center',
              dataIndex: 'periodontalStatus',
              scopedSlots: { customRender: 'periodontalStatus' }
            },
            {
              title: '沙眼',
              width: 80,
              align: 'center',
              dataIndex: 'trachomaStatus',
              scopedSlots: { customRender: 'trachomaStatus' }
            },
            {
              title: '结膜炎',
              width: 80,
              align: 'center',
              dataIndex: 'conjunctivitisStatus',
              scopedSlots: { customRender: 'conjunctivitisStatus' }
            },
            {
              title: '心状态',
              width: 80,
              align: 'center',
              dataIndex: 'heartStatus',
              scopedSlots: { customRender: 'heartStatus' }
            },
            {
              title: '肺状态',
              width: 80,
              align: 'center',
              dataIndex: 'lungStatus',
              scopedSlots: { customRender: 'lungStatus' }
            },
            {
              title: '肝状态',
              width: 80,
              align: 'center',
              dataIndex: 'liverStatus',
              scopedSlots: { customRender: 'liverStatus' }
            },
            {
              title: '脾状态',
              width: 80,
              align: 'center',
              dataIndex: 'spleenStatus',
              scopedSlots: { customRender: 'spleenStatus' }
            },
            {
              title: '头部',
              width: 80,
              align: 'center',
              dataIndex: 'headStatus',
              scopedSlots: { customRender: 'headStatus' }
            },
            {
              title: '颈部',
              width: 80,
              align: 'center',
              dataIndex: 'neckStatus',
              scopedSlots: { customRender: 'neckStatus' }
            },
            {
              title: '胸部',
              width: 80,
              align: 'center',
              dataIndex: 'chestStatus',
              scopedSlots: { customRender: 'chestStatus' }
            },
            {
              title: '脊柱',
              width: 80,
              align: 'center',
              dataIndex: 'spineStatus',
              scopedSlots: { customRender: 'spineStatus' }
            },
            {
              title: '四肢',
              width: 80,
              align: 'center',
              dataIndex: 'limbStatus',
              scopedSlots: { customRender: 'limbStatus' }
            },
            {
              title: '皮肤',
              width: 80,
              align: 'center',
              dataIndex: 'skinStatus',
              scopedSlots: { customRender: 'skinStatus' }
            },
            {
              title: '淋巴结',
              width: 80,
              align: 'center',
              dataIndex: 'lymphGlandStatus',
              scopedSlots: { customRender: 'lymphGlandStatus' }
            }
          ],
          apiToGetList: 'getInternalMedicineDataByStudentId',
          apiToUpdateList: ''
        }
      }

      if (this.dataSource.itemId === '1006') {
        return {
          columns: [
            {
              title: '体检时间',
              width: 140,
              align: 'center',
              dataIndex: 'createTimeStr'
            },
            {
              title: '左眼联合光度',
              width: 120,
              align: 'center',
              dataIndex: 'leftSe'
            },
            {
              title: '左眼近视度',
              width: 120,
              align: 'center',
              dataIndex: 'leftDs'
            },
            {
              title: '左眼闪光度数',
              width: 120,
              align: 'center',
              dataIndex: 'leftDc'
            },
            {
              title: '左眼轴位',
              width: 120,
              align: 'center',
              dataIndex: 'leftAxis'
            },
            {
              title: '左眼瞳孔大小',
              width: 120,
              align: 'center',
              dataIndex: 'leftPupilRadius'
            },
            {
              title: '左眼瞳孔偏移',
              width: 120,
              align: 'center',
              dataIndex: 'leftOffsetr'
            },
            {
              title: '左眼瞳孔y向偏移',
              width: 130,
              align: 'center',
              dataIndex: 'leftOffsetY'
            },
            {
              title: '左眼瞳孔X向偏移',
              width: 130,
              align: 'center',
              dataIndex: 'leftOffsetX'
            },
            {
              title: '右眼联合光度',
              width: 120,
              align: 'center',
              dataIndex: 'rightSe'
            },
            {
              title: '右眼近视度',
              width: 120,
              align: 'center',
              dataIndex: 'rightDs'
            },
            {
              title: '右眼闪光度数',
              width: 120,
              align: 'center',
              dataIndex: 'rightDc'
            },
            {
              title: '右眼轴位',
              width: 120,
              align: 'center',
              dataIndex: 'rightAxis'
            },
            {
              title: '右眼瞳孔大小',
              width: 120,
              align: 'center',
              dataIndex: 'rightPupilRadius'
            },
            {
              title: '右眼瞳孔偏移',
              width: 120,
              align: 'center',
              dataIndex: 'rightOffsetr'
            },
            {
              title: '右眼瞳孔y向偏移',
              width: 130,
              align: 'center',
              dataIndex: 'rightOffsetY'
            },
            {
              title: '右眼瞳孔X向偏移',
              width: 130,
              align: 'center',
              dataIndex: 'rightOffsetX'
            },
            {
              title: '瞳距',
              width: 120,
              align: 'center',
              dataIndex: 'pupilDistance'
            },
            {
              title: '是否有效',
              width: 100,
              fixed: 'right',
              align: 'center',
              dataIndex: 'isEffective',
              scopedSlots: { customRender: 'isEffective' }
            }
          ],
          apiToGetList: 'getOptometryDataByStudentId',
          apiToUpdateList: 'updateOptometryDataStatus'
        }
      }

      return {
        columns: [],
        apiToGetList: '',
        apiToUpdateList: ''
      }
    },
    attributes() {
      return {
        props: {
          ...this.tableProps,
          size: 'small',
          dataSource: this.itemList,
          loading: this.loading,
          columns: [
            ...this.tableProps.columns,
            ...this.dynamicProperties.columns
          ]
        }
      }
    }
  },
  watch: {
    dataSource: {
      deep: true,
      immediate: true,
      async handler() {
        // 在 store.state 里初始化一个用于接收动态Tab内表格数据的字段。
        this.$set(
          this.$store.state[this.moduleName][this.submoduleName],
          this.dataSource.itemId,
          []
        )
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
    },
    // 重写 forTable 的同名函数
    async fetchList() {
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        stateName: this.dataSource.itemId,
        customApiName: this.dynamicProperties.apiToGetList,
        additionalQueryParameters: {
          activityId: this.currentItemOfParent.activityId,
          activityOrgId: this.currentItemOfParent.activityOrgId,
          peObjId: this.currentItemOfParent.peObjId
        }
      })
    }
  }
}
