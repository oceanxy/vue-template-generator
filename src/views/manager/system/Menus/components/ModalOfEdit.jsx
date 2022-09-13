import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 850, destroyOnClose: true } }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    menuTree() {
      return this.getState('menuTree', 'system')
    }
  },
  methods: {
    customDataHandler(values) {
      const data = { ...values }

      data.hide = data.hide ? 1 : 0
      data.keepAlive = data.keepAlive ? 1 : 0
      data.requiresAuth = data.requiresAuth ? 1 : 0
      data.hideBreadCrumb = data.hideBreadCrumb ? 1 : 0
      data.hideChildren = data.hideChildren ? 1 : 0

      return data
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form class="bnm-form-grid" colon={false}>
          <Form.Item label="父级菜单" style={+this.currentItem.parentId === 0 ? { display: 'none' } : null}>
            {
              this.form.getFieldDecorator('parentId', {
                initialValue: this.currentItem.parentId,
                rules: [
                  {
                    required: true,
                    message: '请选择父级菜单！',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  allowClear
                  dropdownClassName={'bnm-tree-select-dropdown'}
                  treeData={this.menuTree.list}
                  replaceFields={{
                    children: 'children', title: 'name', key: 'id', value: 'id'
                  }}
                  treeNodeFilterProp={'title'}
                  placeholder={'请选择父级菜单'}
                  treeDefaultExpandedKeys={[
                    this.menuTree.list?.[0]?.id,
                    this.currentItem.parentId,
                    this.currentItem.id
                  ]}
                />
              )
            }
          </Form.Item>
          <Form.Item label="菜单标题" class={'half'}>
            {
              this.form.getFieldDecorator('menuName', {
                initialValue: this.currentItem.menuName,
                rules: [
                  {
                    required: true,
                    message: '请输入菜单标题',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入菜单标题" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="路由名称" class={'half'}>
            {
              this.form.getFieldDecorator('name', { initialValue: this.currentItem.name })(
                <Input
                  placeholder="请输入路由名称（小驼峰命名规则）"
                  allowClear
                  title={'请输入路由名称（小驼峰命名规则）'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="path">
            {
              this.form.getFieldDecorator('menuUrl', { initialValue: this.currentItem.menuUrl })(
                <Input placeholder="请输入 path" allowClear />
              )
            }
            <p class={'hint'}>
              对应 vue-router 的 path。留空时，跳转到父级时会自动导向到本页面，每个层级最多只能有一个留空的 path 子路由。
            </p>
          </Form.Item>
          <Form.Item label="组件地址">
            {
              this.form.getFieldDecorator('component', { initialValue: this.currentItem.component })(
                <Input placeholder="请输入组件地址" allowClear />
              )
            }
            <p class={'hint'}>
              对应 vue-router 的 component。留空时，默认为 RouterView，此时需要设置本路由的子路由。注意，顶级菜单对应的前端组件内应包含 RouterView。
            </p>
          </Form.Item>
          <Form.Item label="重定向">
            {
              this.form.getFieldDecorator('redirect', { initialValue: this.currentItem.redirect || undefined })(
                <TreeSelect
                  allowClear
                  dropdownStyle={{ maxHeight: '300px' }}
                  treeData={this.menuTree.list}
                  replaceFields={{
                    children: 'children', title: 'name', key: 'id', value: 'id'
                  }}
                  treeNodeFilterProp={'title'}
                  placeholder={'请选择父级菜单'}
                  treeDefaultExpandedKeys={[
                    this.menuTree.list?.[0]?.id,
                    this.currentItem.parentId,
                    this.currentItem.id
                  ]}
                />
              )
            }
            <p class={'hint'}>
              对应 vue-router 的 redirect。当本级的组件地址为 RouterView，且子路由内不存在 path 为空的项时需要设置。
            </p>
          </Form.Item>
          <Form.Item label="简称" class={'half'}>
            {
              this.form.getFieldDecorator('menuShortName', { initialValue: this.currentItem.menuShortName })(
                <Input placeholder="请输入简称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="图标" class={'half'}>
            {
              this.form.getFieldDecorator('menuIcon', { initialValue: this.currentItem.menuIcon })(
                <Input placeholder="请输入图标" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="隐藏" class={'half'}>
            {
              this.form.getFieldDecorator('hide', {
                initialValue: !isNaN(this.currentItem.hide) ? this.currentItem.hide === 1 : false,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
          <Form.Item label="隐藏子级" class={'half'}>
            {
              this.form.getFieldDecorator('hideChildren', {
                initialValue: !isNaN(this.currentItem.hideChildren) ? this.currentItem.hideChildren === 1 : false,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
          <Form.Item label="隐藏面包屑" class={'half'}>
            {
              this.form.getFieldDecorator('hideBreadCrumb', {
                initialValue: !isNaN(this.currentItem.hideBreadCrumb) ? this.currentItem.hideBreadCrumb === 1 : false,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
          <Form.Item label="缓存页面" class={'half'}>
            {
              this.form.getFieldDecorator('keepAlive', {
                initialValue: !isNaN(this.currentItem.keepAlive) ? this.currentItem.keepAlive === 1 : false,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
          <Form.Item label="需要登录" class={'half'}>
            {
              this.form.getFieldDecorator('requiresAuth', {
                initialValue: !isNaN(this.currentItem.requiresAuth) ? this.currentItem.requiresAuth === 1 : true,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>

          <Form.Item label="是否显示" class={'half'}>
            {
              this.form.getFieldDecorator('isShow', {
                initialValue: !isNaN(this.currentItem.isShow) ? this.currentItem.isShow === 1 : true,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
          <Form.Item label="是否默认" class={'half'}>
            {
              this.form.getFieldDecorator('isDefault', {
                initialValue: !isNaN(this.currentItem.isDefault) ? this.currentItem.isDefault === 1 : true,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator('menuDescribe', { initialValue: this.currentItem.menuDescribe })(
                <Input.TextArea placeholder="请输入描述" autoSize={{ minRows: 6 }} allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                initialValue: !isNaN(this.currentItem.status) ? this.currentItem.status === 1 : true,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || undefined,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber style={{ width: '100%' }} placeholder="请输入排序" />
              )
            }
          </Form.Item>
          {/*<Form.Item label="扩展1" class={'half'}>*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator('extend1', { initialValue: this.currentItem.extend1 })(*/}
          {/*      <Input placeholder="请输入扩展1" allowClear />*/}
          {/*    )*/}
          {/*  }*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="扩展2" class={'half'}>*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator('extend2', { initialValue: this.currentItem.extend2 })(*/}
          {/*      <Input placeholder="请输入扩展2" allowClear />*/}
          {/*    )*/}
          {/*  }*/}
          {/*</Form.Item>*/}
        </Form>
      </DragModal>
    )
  }
})