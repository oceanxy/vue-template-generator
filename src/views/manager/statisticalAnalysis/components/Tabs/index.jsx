import './index.scss'
import { Tabs } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: () => ({ activeKey: 1 }),
  methods: {
    onChange(activeKey) {
      this.activeKey = activeKey
      this.$emit('change', activeKey)
    }
  },
  render() {
    return (
      <Tabs
        class={'fe-statistical-analysis-tabs'}
        activeKey={this.activeKey}
        onChange={this.onChange}
        tabBarGutter={8}
        type={'card'}
      >
        <Tabs.TabPane key={1} tab={'按年龄统计'}>
          {this.$slots.ageTable}
        </Tabs.TabPane>
        <Tabs.TabPane key={2} tab={'按年级统计'}>
          {this.$slots.gradeTable}
        </Tabs.TabPane>
      </Tabs>
    )
  }
}
