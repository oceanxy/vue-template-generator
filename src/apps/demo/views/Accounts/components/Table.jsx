import '../assets/styles/index.scss'
import { Icon, Space, Spin, Switch } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import TGPermissionsButton, { getButtonPermission } from '@/components/TGPermissionsButton'

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
            title: '姓名',
            width: 140,
            dataIndex: 'contactName'
          },
          {
            title: '职位',
            width: 140,
            dataIndex: 'position'
          },
          {
            title: '账号',
            width: 200,
            dataIndex: 'username'
          },
          // {
          //   title: '角色',
          //   width: 200,
          //   scopedSlots: { customRender: 'merchantSysRoleList' }
          // },
          // {
          //   title: '门店范围',
          //   width: 200,
          //   scopedSlots: { customRender: 'merchantStoreList' }
          // },
          {
            title: '手机',
            width: 120,
            dataIndex: 'mobile'
          },
          {
            title: '更新时间',
            width: 180,
            dataIndex: 'updateTime'
          },
          {
            title: '最后登录时间',
            width: 180,
            dataIndex: 'finallyLoginTime'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            dataIndex: 'statusStr'
          },
          {
            title: '切换状态',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 160,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
      },
      scopedSlots: {
        title: () => {
          return !this.mainAccountInfo.loading && this.mainAccountInfo.data?.username
            ? (
              <Spin spinning={this.mainAccountInfo.loading}>
                <Space class={'cmp-account-table-title-container'} size={20}>
                  <span class={'cmp-account-table-title'} title="主账号">
                    {this.mainAccountInfo.data.username}
                  </span>
                  <span class={'cmp-account-table-status'} title="状态">
                    <Icon type={'eye'} />&nbsp;{this.mainAccountInfo.data.status ? '正常' : '冻结'}
                  </span>
                  <span class={'cmp-account-table-status'} title="姓名">
                    <Icon type={'user'} />&nbsp;{this.mainAccountInfo.data.contactName}
                  </span>
                  <span class={'cmp-account-table-status'} title="手机号">
                    <Icon type={'phone'} />&nbsp;{this.mainAccountInfo.data.mobile}
                  </span>
                  <TGPermissionsButton
                    identification={'UPDATE_MAIN_PASSWORD'}
                    size={'small'}
                    onClick={() => this._setVisibilityOfModal(
                      { ...this.mainAccountInfo.data, _isMainAccount: true },
                      'visibilityOfResetPwd'
                    )}
                  >
                    修改密码
                  </TGPermissionsButton>
                </Space>
              </Spin>
            ) : null
        },
        merchantSysRoleList: (text, record) => {
          return record.merchantSysRoleList?.join()
        },
        status: (text, record) => {
          return (
            <Switch
              checked={record.status === 1}
              disabled={
                (record.status !== 1 && record.status !== 0) ||
                !getButtonPermission(this.moduleName, 'UPDATE_STATUS')
              }
              onChange={checked => this.onStatusChange({
                checked,
                record,
                nameKey: 'username',
                customStatusValue: { OPENED: 1, CLOSED: 0 },
                optimisticUpdate: false
              })}
            />
          )
        },
        merchantStoreList: (text, record) => {
          return record.merchantStoreList?.join()
        },
        operation: (text, record) => (
          <Space>
            <TGPermissionsButton
              identification={'UPDATE'}
              type="link"
              size="small"
              onClick={() => this.onEditClick(record)}
            >
              编辑
            </TGPermissionsButton>
            {
              record.status === 1
                ? [
                  <TGPermissionsButton
                    identification={'DELETE'}
                    type="link"
                    size="small"
                    onClick={
                      () => this.onDeleteClick(record, {
                        isBulkOperation: false,
                        nameKey: 'username'
                      })
                    }
                  >
                    删除
                  </TGPermissionsButton>,
                  <TGPermissionsButton
                    identification={'UPDATE_PASSWORD'}
                    type="link"
                    size="small"
                    onClick={() => this._setVisibilityOfModal(record, 'visibilityOfResetPwd')}
                  >
                    修改密码
                  </TGPermissionsButton>
                ]
                : null
            }
          </Space>
        )
      }
    }
  },
  computed: {
    mainAccountInfo() {
      return this.$store.state[this.moduleName].mainAccountInfo
    }
  },
  async created() {
    if (getButtonPermission(this.moduleName, 'DETAILS_MAIN')) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'mainAccountInfo',
        customApiName: 'getMainAccountInfo'
      })
    }
  }
}
