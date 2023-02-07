import './index.scss'
import { Button, Card } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    classNumber: {
      type: String,
      default: ''
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    dataSource: {
      immediate: true,
      handler(value) {
        this.$emit('change', value.map(i => i.id))
      }
    }
  },
  methods: {
    onClick(id) {
      const index = this.dataSource.findIndex(student => student.id === id)

      if (index > -1) {
        this.dataSource.splice(index, 1)
        this.$emit('change', this.dataSource.map(i => i.id))
      }
    }
  },
  render() {
    return (
      <div class={'pending-student-container'}>
        {
          this.dataSource.map(student => (
            <Card class={'pending-student-card'}>
              <div class={'pending-student-info'}>
                <p>{student.fullName}</p>
                <p>{student.diseaseTypeStr}</p>
              </div>
              <Button
                type={'primary'}
                size={'small'}
                class={'pending-student-btn'}
                onClick={() => this.onClick(student.id)}
              >
                已到校
              </Button>
            </Card>
          ))
        }
      </div>
    )
  }
}
