import './index.scss'
import forTableModal from '@/mixins/forModal/forTableModal'
import DragModal from '@/components/DragModal'
import Table from './Table'
import { Alert, Empty, Icon, Tabs } from 'ant-design-vue'
import TREE_SCHOOL_SVG from '@/components/TGContainerWithTreeSider/assets/images/tree-school.svg'
import TREE_CLASS_SVG from '@/components/TGContainerWithTreeSider/assets/images/tree-class.svg'
import AVATAR_SVG from '@/layouts/components/TGHeader/images/avatar.svg'

export default {
  mixins: [forTableModal()],
  data() {
    return {
      modalProps: { destroyOnClose: true },
      visibleField: 'visibleOfDetails',
      activeKey: null
    }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: { cancel: () => this.onCancel(this.visibleField) }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value) {
          Object.assign(this, { activeKey: this.currentItem.peItem.itemId })
        }
      }
    }
  },
  methods: {
    onChange(activeKey) {
      Object.assign(this, { activeKey })
    }
  },
  render() {
    return (
      <DragModal {...this.attributes} class={'fe-pe-progress-details-modal'}>
        <Alert
          message={'提示：您需要设置且仅可设置一条数据作为本次活动的有效数据。（默认以最新数据为有效数据）'}
          type={'info'}
          closable={true}
        />
        <div class={'fe-pe-progress-details-modal-basic-info'}>
          <div
            class={`avatar${this.currentItem.photo ? ' bg' : ''}`}
            style={{ '--bg': `url(${this.currentItem.photo})` }}
          >
            {
              !this.currentItem.photo && <Icon component={AVATAR_SVG} />
            }
          </div>
          <div class={'content'}>
            <p class={'name'}>{this.currentItem.fullName}（{this.currentItem.genderStr}）</p>
            <p>身份证号：{this.currentItem.idNumber}</p>
            <p class={'location'}>
              <Icon component={TREE_SCHOOL_SVG} />
              {this.currentItem.peObjOrgName}
              <Icon component={TREE_CLASS_SVG} style={'margin-left: 16px;'} />
              {this.currentItem.gradeStr}
              {this.currentItem.classNumber}
              班
            </p>
          </div>
        </div>
        {
          this.activeKey
            ? (
              <Tabs
                class={'fe-pe-progress-details-modal-content'}
                activeKey={this.activeKey}
                type={'card'}
                size={'small'}
                animated={true}
                onChange={this.onChange}
              >
                {
                  this.currentItem.peItemVOList?.map(item => (
                    <Tabs.TabPane key={item.itemId} tab={item.itemName}>
                      <Table dataSource={item} tableName={`${this.moduleName}Table${item.itemId}`} />
                    </Tabs.TabPane>
                  ))
                }
              </Tabs>
            )
            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无已检项目数据'} />
        }
      </DragModal>
    )
  }
}
