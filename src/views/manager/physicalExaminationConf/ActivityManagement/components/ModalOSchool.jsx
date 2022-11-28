import '../assets/styles/index.scss'
import { Form, Icon, message, Checkbox, List, Space, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import InquirySchoolModal from './InquirySchoolModal'
import ICON_SCHOOL_RIGHT from '../assets/images/school_icon_right.svg'
import ICON_SCHOOL_LEFT from '../assets/images/school_icon_left.svg'
import SCHOOL_LEFT from '../assets/images/school_left.svg'
import SCHOOL_RIGHT from '../assets/images/school_right.svg'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfSchoolList',
      modalProps: {
        width: 900,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      allKeys: []
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    activeSchoolList() {
      return this.getState('activeSchoolList', this.moduleName)
    },
    primarySchool() {
      return this.activeSchoolList.list?.filter(item => item.schoolType === 211) ?? 0
    },
    middleSchool() {
      return this.activeSchoolList.list?.filter(item => item.schoolType === 311 || item.schoolType === 341) ?? 0
    },
    vocationalHighSchool() {
      return this.activeSchoolList.list?.filter(item => item.schoolType === 365) ?? 0
    },
    rightPrimarySchool() {
      return this.rightSchool?.filter(item => item.schoolType === 211) ?? 0
    },
    rightMiddleSchool() {
      return this.rightSchool?.filter(item => item.schoolType === 311 || item.schoolType === 341) ?? 0
    },
    rightVocationalHighSchool() {
      return this.rightSchool?.filter(item => item.schoolType === 365) ?? 0
    },
    // 是否全选
    checkAll() {
      // const iSChenck = this.rightSchool.forEach(item => {
      //   this.allKeys.map(item2 => {
      //     if (item2.id === item.id) {
      //       return true
      //     }
      //   })
      // })

      if (this.allKeys.length > 0) {
        if (this.allKeys.length === this.activeSchoolList.list.length) {
          return true
        }
      } else {
        return false
      }

    },
    // 根据allKeys显示右侧的学校
    rightSchool: {
      get() {
        return this.getState('rightSchool', this.moduleName)
      },
      // set(value) {
      //   this.$store.commit('addSchoolList', value)
      // }
    }
  },
  methods: {
    async getListBySearch() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'activeSchoolList',
        customApiName: 'getListBySearch'
      })
    },
    // 是否开启全选
    SwitchCheckAll(checked, e) {
      if (!this.activeSchoolList.list) {
        return message.error('暂无学校列表！')
      }

      const keys = []

      this.activeSchoolList.list.forEach(item => {
        keys.push(item.id)
      })
      this.allKeys = checked ? keys : []
      this.toRightData()
    },
    onChange(e) {
      this.allKeys = e
      this.toRightData()
    },
    // 向右侧插入数据
    async toRightData() {
      const arr = []

      this.allKeys.forEach(item => {
        this.activeSchoolList.list.filter(item2 => {
          if (item2.id === item) {
            arr.push(item2)
          }
        })
      })

      if (arr) {
        await dispatch(this.moduleName, 'add_item', arr)
      }

    },
    // 删除学校
    deleteSchool(id) {
      dispatch(this.moduleName, 'del_item', id)
    }
  },
  watch: {
    'modalProps.visible'(value) {
      if (value) {
        this.getListBySearch()
      }
    },
    rightSchool: {
      deep: true,
      immediate: true,
      handler(value) {
        const nesAllKeys = value.map(item => {
          return item.id
        })

        this.allKeys = nesAllKeys
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
      <DragModal {...attributes} class={'bnm-school-modal'}>
        <Form>
          <div class="school">
            <div class="item left">
              <div class="school-header">
                <h2><Icon class="icon" component={ICON_SCHOOL_LEFT} />学校列表</h2>
                <p>学校共<strong> {this.activeSchoolList.list.length} </strong><Space size={10}>所 <span>小学</span></Space>
                  <strong>{this.primarySchool.length}</strong> / 中学
                  <strong>{this.middleSchool.length}</strong> / 职高
                  <strong>{this.vocationalHighSchool.length}</strong>
                </p>
              </div>
              <InquirySchoolModal />
              <div class="school-center">
                <Space class="select-all">全选
                  <Switch
                    checked={this.checkAll}
                    onChange={this.SwitchCheckAll}
                  />
                </Space>
                <Checkbox.Group style={{ width: '100%' }} value={this.allKeys} onChange={this.onChange}>
                  <List
                    loading={this.activeSchoolList.loading}
                    grid={{ gutter: 10, column: 1 }}
                    dataSource={this.activeSchoolList.list}
                    {...{
                      scopedSlots: {
                        renderItem: item => (
                          <label>
                            <List.Item
                              class={`activity-management-school-item ${this.allKeys?.some(d => { return d === item.id }) ? 'active' : ''}`}>

                              {
                                this.item?.schoolBadge ? <img src={item.schoolBadge} /> : <Icon class="icon" component={SCHOOL_LEFT} />
                              }
                              <div>
                                <div class="title">{item.fullName}</div>
                                <p>{item.fullNamePinyin}</p>
                              </div>
                              <Checkbox value={item.id}></Checkbox>
                            </List.Item>
                          </label>
                        )
                      }
                    }}
                  />
                </Checkbox.Group>
              </div>
            </div>
            <div class="item right">
              <div class="school-header">
                <h2><Icon class="icon" component={ICON_SCHOOL_RIGHT} />已选学校</h2>
                <p>学校共<strong> {this.rightSchool.length} </strong><Space size={10}>所 <span>小学</span></Space>
                  <strong>{this.rightPrimarySchool.length}</strong>
                  / 中学<strong>{this.rightPrimarySchool.length}</strong>
                  / 职高<strong>{this.rightVocationalHighSchool.length}</strong>
                </p>
              </div>
              <div class="school-center">

                <List grid={{ gutter: 10, column: 1 }} dataSource={this.rightSchool}
                  {...{
                    scopedSlots: {
                      renderItem: item => (
                        <List.Item class="activity-management-school-item hover">
                          {
                            this.item?.schoolBadge ? <img src={item.schoolBadge} /> : <Icon class="icon" component={SCHOOL_RIGHT} />
                          }
                          <div>
                            <div class="title">{item.fullName}</div>
                            <p>{item.fullNamePinyin}</p>
                          </div>
                          <span onClick={() => this.deleteSchool(item.id)} >
                            <Icon class="close" type="close-circle" />
                          </span>

                        </List.Item>
                      )
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </Form>
      </DragModal >
    )
  }
})
