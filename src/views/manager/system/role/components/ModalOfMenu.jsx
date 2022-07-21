import '../assets/styles/index.scss'
import { Form, message } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import PrivilegeTree from '@/components/BNContainerWithSystem/components/PrivilegeTree'
import apis from '@/apis'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfMenu',
      modalProps: {
        confirmLoading: false,
        width: 500,
        wrapClassName: 'bnm-modal-config-role-form'
      },
      defaultCheckedKeysData: []
    }
  },
  computed: {
    defaultCheckedKeys() {
      return this.defaultCheckedKeysData.map(item => item.objId)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (!value) {
          this.defaultCheckedKeysData = []
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      const data = {
        ...values
      }

      if (data.parentId.length > 0) {
        data.parentId = data.parentId[data.parentId.length - 1]
      } else {
        data.parentId = ''
      }

      if (data.indexMenuId.length > 0) {
        data.indexMenuId = data.indexMenuId[data.indexMenuId.length - 1]
      } else {
        data.indexMenuId = ''
      }

      return data
    },
    async onSubmit() {
      this.modalProps.confirmLoading = true
      const res = await apis.setPrivilege({
        roleId: this.currentItem.id,
        privilegeInfoList: this.defaultCheckedKeysData
      })

      this.modalProps.confirmLoading = false

      if (res.status) {
        message.success('配置完成')
        this.onCancel(this.visibleField)
      }
    },
    onCheck(values, e) {
      this.defaultCheckedKeysData = e.checkedNodes.map(item => {
        const props = item.data.props

        return {
          objId: props.id,
          plType: props.tag
        }
      })
    },
    onLoadedTree(treeList) {
      const result = []
      const recursion = _list => {
        _list.forEach(item => {
          if (item.checked) {
            result.push({ objId: item.id, plType: item.tag })
          }

          if (item.children && item.children.length > 0) {
            recursion(item.children)
          }
        })
      }

      recursion(treeList)
      this.defaultCheckedKeysData = result
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes}>
        <PrivilegeTree
          roleId={this.currentItem.id}
          defaultCheckedKeys={this.defaultCheckedKeys}
          checkable={true}
          oncheck={this.onCheck}
          onloaded={this.onLoadedTree}></PrivilegeTree>
      </DragModal>
    )
  }
})
