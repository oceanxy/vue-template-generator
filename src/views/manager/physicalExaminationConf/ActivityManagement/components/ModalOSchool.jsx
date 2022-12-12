import '../assets/styles/index.scss'
import { Icon, message, Checkbox, List, Space, Switch, Button } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import InquirySchoolModal from './InquirySchoolModal'
import ICON_SCHOOL_RIGHT from '../assets/images/school_icon_right.svg'
import ICON_SCHOOL_LEFT from '../assets/images/school_icon_left.svg'
import SCHOOL_LEFT from '../assets/images/school_left.svg'
import SCHOOL_RIGHT from '../assets/images/school_right.svg'

export default ({
  mixins: [forModal()],
  data() {
    return {
      visibleField: 'visibleOfSchoolList',
      modalProps: {
        width: 900,
        wrapClassName: 'bnm-modal-edit-user-form',
        footer: [
          <Button onClick={() => this.onCancel(this.visibleField)}>取消</Button>,
          <Button type="primary" onClick={() => this.onSubmit()}>确定</Button>
        ]
      },
      allKeys: [],
      initSchoolNumber: 0 //默认学校数量
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    search() {
      return this.getState('search', 'activityManagement')
    },
    activeSchoolList() {
      return this.getState('activeSchoolList', 'activityManagement')
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
    // 根据allKeys显示右侧的学校
    rightSchool: {
      get() {
        return this.getState('rightSchool', 'activityManagement')
      },
      set(value) {
        this.$store.commit('setState', {
          value: value,
          moduleName: 'activityManagement',
          stateName: 'rightSchool'
        })
      }
    },
    // 是否全选
    checkAll() {
      let bln = null

      if (this.allKeys.length > 0) {
        if (this.allKeys.length === this.initSchoolNumber) {
          bln = true
        }
      } else {
        bln = false
      }

      return bln
    },
  },
  methods: {
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

      if (this.activeSchoolList.list.length === this.initSchoolNumber) {
        if (checked) {
          this.rightSchool = [...this.activeSchoolList.list]
        } else {
          this.rightSchool = []
        }
      } else {
        if (checked) {
          this.toRightData()
        } else {
          this.activeSchoolList.list.map(item => {
            this.deleteSchool(item.id)
          })
        }


      }
    },
    onChange(e) {
      this.allKeys = e
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
        await dispatch('activityManagement', 'addSchoolItem', arr)
      }

    },
    async delChange(e) {
      const id = e.target.value
      const isKey = this.allKeys.some(item => { return item === id })

      if (isKey === true) {
        this.deleteSchool(id)
      } else {
        const arr = []

        this.activeSchoolList.list.filter(item2 => {
          if (item2.id === id) {
            arr.push(item2)
          }
        })

        if (arr) {
          await dispatch('activityManagement', 'addSchoolItem', arr)
        }
      }
    },
    // 删除学校
    async deleteSchool(id) {
      await dispatch('activityManagement', 'delSchoolItem', id)
    },
    // 确认学校
    async onSubmit() {
      if (this.rightSchool && this.rightSchool.length > 0) {
        await this.$store.dispatch('setModalVisible', {
          statusField: 'visibleOfSchoolList',
          statusValue: false,
          moduleName: 'activityManagement'
        })
      } else {
        return message.error('请选择学校')
      }
    }
  },
  watch: {
    async 'modalProps.visible'(value) {
      if (value) {
        if (this.initSchoolNumber === 0) {
          const status = await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: 'activityManagement',
            stateName: 'activeSchoolList',
            customApiName: 'getListBySearch'
          })

          if (status) {
            this.initSchoolNumber = this.activeSchoolList.list.length
            console.log(this.initSchoolNumber)
          }
        }
      }
    },
    rightSchool: {
      deep: true,
      immediate: true,
      handler(value) {
        const newsAllKeys = value.map(item => {
          return item.id
        })

        this.allKeys = newsAllKeys
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes} class={'bnm-school-modal'}>
        <div class="school" >
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
                            <Checkbox value={item.id} onChange={this.delChange}></Checkbox>
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
                / 中学<strong>{this.rightMiddleSchool.length}</strong>
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
      </DragModal >
    )
  }
})
