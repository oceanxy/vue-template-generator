import '../assets/styles/index.scss'
// import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapAction, mapMutation, mapState } from '@/utils/store'
import RoomsTree from '@/components/BNContainerWithSystemSider/components/RoomsTree'

// import moment from 'moment'
export default {
  inject: ['moduleName'],
  data() {
    return {
      modalProps: {
        title: '选择房源',
        width: 500,
        wrapclass: 'bnm-modal-discount-policy-roomtree'
      },
      defaultCheckedKeys: []
    }
  },
  computed: { ...mapState(['visibleOfRooms']) },
  watch: {
    visibleOfRooms: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.$nextTick(function() {
            this.$refs['roomsTreeRef'].getPrivilegeTree()
          })
        } else {
          this.fullRoomData = []
          this.defaultCheckedKeys = []
          this.halfCheckedKeys = []
        }
      }
    }
  },
  methods: {
    ...mapAction(['getDetail', 'getSaleItemList']),
    ...mapMutation(['set_visibleOfRooms']),
    onChangeTree(values, fullData) {
      this.defaultCheckedKeys = values
      this.fullRoomData = fullData.checkedNodes.map(item => item.data.props)
      this.halfCheckedKeys = fullData.halfCheckedKeys
    },
    onLoadedTree(data) {
      this.treeList = data
    },
    onSubmit() {
      const fullRoomData = this.fullRoomData || []

      this.$emit(
        'done',
        fullRoomData.filter(item => item.tag === '4').map(item => item.id),
        this.getStatistics()
      )
      this.onCancel()
    },
    getStatistics() {
      const keys = new Set([...this.fullRoomData.map(item => item.id), ...this.halfCheckedKeys])
      const mapData = {
        2: 0,
        3: 0,
        4: 0
      }
      const fn = _list => {
        _list.forEach(item => {
          if (item.tag in mapData && keys.has(item.id)) {
            mapData[item.tag] += 1
          }

          if (item.children && item.children.length > 0) {
            fn(item.children)
          }
        })
      }

      fn(this.treeList || [])

      return mapData
    },
    onCancel() {
      this.set_visibleOfRooms(false)
    }
  },
  render() {
    const attributes = {
      attrs: {
        ...this.modalProps,
        visible: this.visibleOfRooms
      },
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes}>
        <RoomsTree
          ref="roomsTreeRef"
          defaultCheckedKeys={this.defaultCheckedKeys}
          checkable={true}
          onloaded={this.onLoadedTree}
          oncheck={this.onChangeTree}
        ></RoomsTree>
      </DragModal>
    )
  }
}
