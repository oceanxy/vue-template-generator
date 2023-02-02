/**
 * 统计分析模块下页面关于活动的搜索组件
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-11-14 周一 16:05:48
 */

import './index.scss'
import { mapGetters } from 'vuex'
import forInquiry from '@/mixins/forInquiry'
import forIndex from '@/mixins/forIndex'
import { Button, Checkbox, Empty, Form, Icon, Radio, Select, Spin } from 'ant-design-vue'

export default Form.create({})({
  mixins: [forInquiry(), forIndex],
  props: {
    /**
     * 用于区分当前 Tabs.TabPane 的标识。
     */
    type: {
      type: Number,
      required: true
    },
    /**
     * 要获取的统计数据的类型
     * 1:身高体重/派生指数 2：血压 3：视力 4：肺活量 5龋齿 6疾病 7营养状况
     */
    statisticType: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    currentActivity: {},
    initialValues: {
      schoolTypes: [111, 211, 241, 311, 341, 365, 411],
      gender: 1
    },
    // 镇街范围筛选器： 全选/全不选 功能控制
    checkAllTownOrSubDistricts: true
  }),
  computed: {
    ...mapGetters({ getState: 'getState' }),
    activities() {
      return this.getState('activities', this.moduleName)
    },
    townOrSubDistricts() {
      return this.getState('townOrSubDistricts', this.moduleName)
    },
    allTownOrSubDistricts() {
      return this.townOrSubDistricts.list.map(item => item.streetId)
    }
  },
  watch: {
    async type() {
      await this.setSearch()
    }
  },
  async created() {
    const status = await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'activities',
      customApiName: 'getActivitiesForStatisticsAnalysis',
      payload: { itemType: this.statisticType }
    })

    if (status) {
      this.currentActivity = this.activities.list[0]
      this.emit()

      await this.getTownOrSubDistrictsForSelectByActivityId(this.activities.list[0].id)
    }
  },
  methods: {
    async getTownOrSubDistrictsForSelectByActivityId(activityId) {
      const status = await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'townOrSubDistricts',
        customApiName: 'getTownOrSubDistrictsForSelectByActivityId',
        payload: { activityId }
      })

      if (status) {
        await this.setSearch()
      }
    },
    async setSearch() {
      this.onSubmit(null, { type: this.type })
    },
    async onActivityChange(activityId) {
      this.currentActivity = this.activities.list.find(activity => activityId === activity.id)
      this.emit()

      await this.getTownOrSubDistrictsForSelectByActivityId(activityId)
    },
    onChange() {
      // 在 onChange 里面触发表单验证或提交有滞后性，表单项值的改变慢与表单的验证，
      // 导致传递给接口的参数不是改变后的值，用 nextTick 规避此问题。
      this.$nextTick(async () => await this.setSearch())
    },
    emit() {
      this.$emit('exportParamsChange', {
        activityName: this.currentActivity.activityName,
        dataNumber: this.currentActivity.dataNum,
        schoolNumber: this.currentActivity.schoolNum,
        streetNumber: this.currentActivity.streetNum,
        year: this.currentActivity.activityYear
      })
    },
    filterTownOrSubDistricts() {
      if (this.form.getFieldValue('range').length === this.townOrSubDistricts.list.length) {
        this.form.setFieldsValue({ 'range': [] })
        this.checkAllTownOrSubDistricts = false
      } else {
        this.form.setFieldsValue({ 'range': this.allTownOrSubDistricts })
        this.checkAllTownOrSubDistricts = true
      }

      // 通过 this.form.setFieldsValue 的方式更新表单值不会触发表单的 change 事件，所以这里手动调用，模拟一下
      this.onChange()
    }
  },
  render() {
    return (
      <div class="tg-inquiry fe-statistical-analysis-inquiry">
        <div class={'row-title'}>
          <p class={'title'}>
            {`重庆市${
              this.currentActivity.countyName || '-'
            }${
              this.currentActivity.activityYearStr || '-'
            }学年度身高统计`}
            <span class={'highlight'}>{
              ['', '（男生）', '（女生）'][this.form.getFieldValue('gender')]
            }</span>
          </p>
          <p class={'info'}>
            统计范围：
            <span>{this.currentActivity.streetNum || '-'}</span>个镇街，
            <Button
              type={'link'}
              onClick={() => this._setVisibilityOfModal(this.currentActivity, 'visibilityOfSchools')}
            >
              {this.currentActivity.schoolNum || '-'}
            </Button>
            所学校，
            <Button
              type={'link'}
              onClick={() => this._setVisibilityOfModal(this.currentActivity, 'visibilityOfStudents')}
            >
              {this.currentActivity.dataNum || '-'}
            </Button>
            条数据。
            数据来源：<span>{this.currentActivity.activityName || '-'}</span>
          </p>
        </div>
        <Form class={'row-inquiry'}>
          <Form.Item class={'activity'} label={'数据来源'}>
            <Spin spinning={this.activities.loading}>
              {
                this.activities.list?.length
                  ? this.form.getFieldDecorator(
                    'activityId',
                    { initialValue: this.activities.list[0]?.id ?? undefined }
                  )(
                    <Select
                      suffixIcon={<Icon type="caret-down" />}
                      notFoundContent={<Empty />}
                      onChange={this.onActivityChange}
                    >
                      {
                        this.activities.list.map(item => (
                          <Select.Option
                            value={item.id}
                            title={item.activityName}
                          >
                            {item.activityName}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  )
                  : <span style={'padding: 8px'}>暂无数据</span>
              }
            </Spin>
          </Form.Item>
          <Form.Item label={'镇街范围'}>
            <Spin spinning={this.townOrSubDistricts.loading} class={'include-check-all'}>
              {
                this.form.getFieldDecorator(
                  'range',
                  { initialValue: this.allTownOrSubDistricts }
                )(
                  <Checkbox.Group onChange={this.onChange}>
                    {
                      this.townOrSubDistricts.list?.length
                        ? (
                          <div
                            class={`check-all${this.checkAllTownOrSubDistricts ? ' checked' : ''}`}
                            onClick={this.filterTownOrSubDistricts}
                          >
                            全选
                          </div>
                        )
                        : null
                    }
                    {
                      this.townOrSubDistricts.list?.length
                        ? this.townOrSubDistricts.list.map(item => (
                          <Checkbox value={item.streetId}>{item.streetName}</Checkbox>
                        ))
                        : '暂无数据（选择活动后显示）'
                    }
                  </Checkbox.Group>
                )
              }
            </Spin>
          </Form.Item>
          <Form.Item label={'类型范围'}>
            {
              this.form.getFieldDecorator('schoolTypes', { initialValue: this.initialValues.schoolTypes })(
                <Checkbox.Group onChange={this.onChange}>
                  <Checkbox value={111}>幼儿园</Checkbox>
                  <Checkbox value={211}>小学</Checkbox>
                  <Checkbox value={241}>完全小学</Checkbox>
                  <Checkbox value={311}>初级中学</Checkbox>
                  <Checkbox value={341}>完全中学</Checkbox>
                  <Checkbox value={365}>职业高中</Checkbox>
                  <Checkbox value={411}>大学</Checkbox>
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label={'性别范围'}>
            {
              this.form.getFieldDecorator('gender', { initialValue: this.initialValues.gender })(
                <Radio.Group onChange={this.onChange}>
                  <Radio value={1}>男生</Radio>
                  <Radio value={2}>女生</Radio>
                  <Radio value={0}>不限</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
        </Form>
      </div>
    )
  }
})
