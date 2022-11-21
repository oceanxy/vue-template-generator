import '../assets/styles/index.scss'
import { Form, Spin, Tree, Icon, Empty } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import ICON_TREE_DISTRICT from '@/components/TGContainerWithTreeSider/assets/images/tree-district.svg'
import ICON_TREE_STREET from '@/components/TGContainerWithTreeSider/assets/images/tree-street.svg'
import ICON_TREE_SCHOOL from '@/components/TGContainerWithTreeSider/assets/images/tree-school.svg'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfSchoolTre',
      modalProps: {
        width: 400,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      oldTreeIdField: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    schoolListByActivity() {
      return this.getState('schoolListByActivity', this.moduleName)
    }
  },
  methods: {
    async getSchoolTreeByActivityId() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'schoolListByActivity',
        customApiName: 'getSchoolTreeByActivityId',
        payload: {
          activityId: this.currentItem?.curActivitieId ?? null
        }
      })
    },
    customDataHandler(values) {
      const data = { ...values }

      return data
    },
    async onSelect(selectedKeys, e) {
      const payload = {}
      // const treeIdField = this.getFieldNameForTreeId(e.node.pos.split('-').length - 1)

      console.log(selectedKeys, e)


    }
  },
  watch: {
    'modalProps.visible'(value) {
      if (value) {
        this.getSchoolTreeByActivityId()
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        {/* <Spin spinning={this.schoolListByActivity.loading}>
          <TreeSelect
            style="width:100%"
            multiple
            suffixIcon={<Icon type="caret-down" />}
            treeCheckable
            dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
            replaceFields={{
              children: 'children',
              title: 'name',
              key: 'id'
            }}
            tree-default-expand-all
            treeData={this.schoolListByActivity.list}
          ></TreeSelect>
        </Spin> */}
        <Spin spinning={this.schoolListByActivity.loading}>
          {
            this.schoolListByActivity.list?.length ? (
              <Tree
                multiple
                dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
                treeCheckable
                showLine
                showIcon
                onSelect={this.onSelect}
              >
                {
                  this.schoolListByActivity?.list?.map(item => (
                    <Tree.TreeNode
                      key={item.id}
                      title={`${item.name}（${item?.children?.length})`}
                    >
                      <Icon slot={'icon'} class={'icon'} component={ICON_TREE_DISTRICT} />
                      <div slot={'title'}>{item.name}</div>
                      {
                        item?.children?.map(subItem => (
                          <Tree.TreeNode
                            key={subItem.id}
                            title={`${subItem.name}${subItem.children ? `(${subItem.children.length})` : ''}`}
                          >
                            <Icon slot={'icon'} class={'icon'} component={ICON_TREE_STREET} />
                            <div slot={'title'}>{subItem.name}</div>
                            {
                              subItem?.children?.map(leafItem => (
                                <Tree.TreeNode key={leafItem.id}>
                                  <Icon slot={'icon'} class={'icon'} component={ICON_TREE_SCHOOL} />
                                  {
                                    this.searchValue
                                      ? (
                                        <span
                                          slot={'title'}
                                          title={leafItem.name}
                                          domPropsInnerHTML={
                                            leafItem.name.replace(
                                              this.searchValue,
                                              `<span style="color: #16b364">${this.searchValue}</span>`
                                            )
                                          }
                                        />
                                      )
                                      : <span slot={'title'} title={leafItem.name}>{leafItem.name}</span>
                                  }
                                </Tree.TreeNode>
                              )) ?? []
                            }
                          </Tree.TreeNode>
                        )) ?? []
                      }
                    </Tree.TreeNode>
                  ))
                }
              </Tree>
            ) : <Empty />
          }
        </Spin>
      </DragModal >
    )
  }
})
