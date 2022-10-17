import Tree from '../Tree'
import { createNamespacedHelpers, mapGetters } from 'vuex'

const { mapActions } = createNamespacedHelpers('common')

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    checkable: Boolean,
    defaultCheckedKeys: Array,
    roleId: String
  },
  data() {
    return {
      loading: false,
      selectedKeys: [],
      defaultKeys: [],
      defaultExpandedKeys: []
    }
  },
  computed: {
    // ...mapState(['informationTypes'])
    ...mapGetters({ getState: 'getState' }),
    informationTypes() {
      return this.getState('informationTypes', 'common')
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true

      const res = await this.getInformationTypes()

      this.loading = false

      if (res.status) {
        const list = res.data || []

        if (list.length > 0) {
          this.defaultKeys = [list[0].id]
          this.defaultExpandedKeys = [list[0].id]
        }

        this.$emit('loaded', list, this.defaultKeys)
      }
    },
    ...mapActions(['getInformationTypes']),
    onChange(data) {
      this.defaultKeys = data
      this.emitEvent()
    },
    onCheck(keys, e) {
      this.$emit('check', keys, e)
    },
    emitEvent() {
      this.$emit('change', this.defaultKeys)
    }
  },
  render() {
    return (
      <Tree
        value={this.defaultKeys}
        loading={this.loading}
        data={this.informationTypes}
        checkable={this.checkable}
        defaultExpandedKeys={this.defaultExpandedKeys}
        defaultCheckedKeys={this.defaultCheckedKeys}
        onchange={this.onChange}
        oncheck={this.onCheck}
      ></Tree>
    )
  }
}
