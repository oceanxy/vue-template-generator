import './index.scss'
import { Table } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  inject: ['moduleName', 'submoduleName'],
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '楼栋',
            width: 100,
            dataIndex: 'buildName'
          },
          {
            title: '楼层',
            width: 60,
            align: 'center',
            dataIndex: 'floorName'
          },
          {
            title: '房间',
            width: 100,
            align: 'center',
            dataIndex: 'roomNo'
          },
          {
            title: '面积（㎡）',
            align: 'center',
            width: 160,
            dataIndex: 'roomArea'
          },
          {
            title: '装修',
            width: 100,
            dataIndex: 'renovationStatusStr'
          },
          {
            title: '配套详情',
            dataIndex: 'supportFacility'
          }
        ],
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false,
        size: 'middle'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName, this.submoduleName)
    },
    hatcheries() {
      return this.getState('list', this.moduleName, this.submoduleName)
    }
  },
  watch: {
    value: {
      immediate: true,
      async handler(value) {
        if (value.length) {
          this.tableProps.dataSource = this.hatcheries
        } else {
          this.tableProps.dataSource = []
        }
      }
    }
  },
  created() {
    this.$watch(
      () => this.$store.state[this.moduleName][this.submoduleName].list,
      value => {
        this.tableProps.dataSource = value
        this.$emit('change', value.map(item => item.id))
      }
    )
  },
  methods: {
    async onReSignClick() {
      await this.$router.push({ name: 'signingProcess' })
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.loading
      }
    }

    return (
      <Table ref={`${this.moduleName}Table`} {...attributes} />
    )
  }
}
